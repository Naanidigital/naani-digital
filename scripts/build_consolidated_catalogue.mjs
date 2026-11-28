import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { parseMigrationSql } from './test_migration_parser.mjs';

const BACKUP_PATH = path.resolve('naani-main/supabase/backups/projects_backup_live_hadxpgwzmvxqslcyykyw_20261121.json');
const MIGRATIONS_DIR = path.resolve('naani-main/supabase/migrations');
const CONSOLIDATED_JSON_PATH = path.resolve('naani-main/supabase/backups/consolidated_property_catalogue.json');
const TARGET_SQL_PATH = path.resolve('naani-main/supabase/migrations/20261121000002_seed_property_catalogue.sql');

// 1. Helper for SQL string escaping
function escapeSql(column, val) {
  if (val === null || val === undefined) return 'NULL';
  if (column === 'faqs') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return val.toString();
  if (Array.isArray(val)) {
    if (val.length === 0) {
      if (column === 'bhk_list') return "'{}'::int[]";
      return "'{}'::text[]";
    }
    if (typeof val[0] === 'number') return `ARRAY[${val.join(',')}]::int[]`;
    const escaped = val.map(s => `'${String(s).replace(/'/g, "''")}'`);
    return `ARRAY[${escaped.join(',')}]::text[]`;
  }
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

// 2. Helper to clean FAQs
function cleanFaqs(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map(item => {
      if (typeof item === 'string') {
        try {
          return JSON.parse(item);
        } catch {
          return { q: 'FAQ', a: item };
        }
      }
      return item;
    });
  }
  if (typeof raw === 'string') {
    try {
      const cleaned = raw.replace(/'::jsonb$/i, '').trim();
      return JSON.parse(cleaned);
    } catch {
      return [];
    }
  }
  return [];
}

export function buildConsolidatedCatalogue() {
  console.log('================================================================');
  console.log('CONSOLIDATING PROPERTY CATALOGUE FOR NAANI.IN');
  console.log('================================================================\n');

  // Stats tracking
  const stats = {
    sourceBackupRecords: 0,
    migrationAdditions: 0,
    migrationUpdates: 0,
    pageAdditions: 0,
    pageEnrichments: 0,
    totalConsolidated: 0,
    incompleteRecords: []
  };

  // --- STEP 1: Load Verified Production Database Backup ---
  const rawBackup = fs.readFileSync(BACKUP_PATH, 'utf8').replace(/^\uFEFF/, '');
  const backupRecords = JSON.parse(rawBackup);
  stats.sourceBackupRecords = backupRecords.length;
  console.log(`[Source 1: Production Backup] Loaded ${stats.sourceBackupRecords} baseline records.`);

  // Use a Map keyed by slug for catalogue consolidation
  const catalogueMap = new Map();
  const idToSlugMap = new Map();

  for (const item of backupRecords) {
    const record = {
      ...item,
      faqs: cleanFaqs(item.faqs),
      amenities: Array.isArray(item.amenities) ? item.amenities : [],
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      bhk_list: Array.isArray(item.bhk_list) ? item.bhk_list : []
    };
    catalogueMap.set(record.slug, record);
    idToSlugMap.set(record.id, record.slug);
  }

  // --- STEP 2: Process Unapplied SQL Migrations ---
  const migrationFiles = [
    '20261011000000_add_canny_aravindam.sql',
    '20261112000000_add_candeur_arbora.sql',
    '20261113000000_update_aparna_serenity.sql',
    '20261113000001_update_cybercity_stone_ridge.sql',
    '20261113000002_update_vasavi_atlantis.sql',
    '20261113000003_update_pavani_starlit.sql',
    '20261115000000_add_pavani_felicity.sql',
    '20261115000001_add_pavani_mirai.sql',
    '20261115000002_add_urbanrise_on_cloud_33.sql',
    '20261115000003_add_urbanrise_sky_habitat.sql'
  ];

  console.log(`\n[Source 2: SQL Migrations] Processing ${migrationFiles.length} migration files...`);

  for (const file of migrationFiles) {
    const fullPath = path.join(MIGRATIONS_DIR, file);
    const parsed = parseMigrationSql(fullPath);
    if (!parsed || !parsed.slug) {
      console.warn(`  Warning: Could not parse migration ${file}`);
      continue;
    }

    const slug = parsed.slug;
    parsed.faqs = cleanFaqs(parsed.faqs);

    if (catalogueMap.has(slug)) {
      // EXISTING RECORD UPDATE
      const existing = catalogueMap.get(slug);
      stats.migrationUpdates++;
      console.log(`  Merged UPDATE into existing record: "${slug}" (Preserved original UUID: ${existing.id})`);

      const updated = { ...existing };
      for (const [k, v] of Object.entries(parsed)) {
        if (k === 'id' || k === 'slug') continue; // Never overwrite UUID or slug
        if (v !== null && v !== undefined && v !== '') {
          if (Array.isArray(v) && v.length === 0 && existing[k] && existing[k].length > 0) {
            continue;
          }
          updated[k] = v;
        }
      }
      updated.updated_at = new Date().toISOString();
      catalogueMap.set(slug, updated);
    } else {
      // NEW PROJECT RECORD
      stats.migrationAdditions++;
      const newId = parsed.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(parsed.id)
        ? parsed.id
        : crypto.randomUUID();

      const newRecord = {
        id: newId,
        slug: slug,
        name: parsed.name || slug,
        builder: parsed.builder || 'Naani Partner Builder',
        location: parsed.location || 'Hyderabad',
        city: parsed.city || 'Hyderabad',
        configuration: parsed.configuration || null,
        bhk_list: Array.isArray(parsed.bhk_list) ? parsed.bhk_list : [],
        property_type: parsed.property_type || 'Apartment',
        price_range: parsed.price_range || null,
        min_price_inr: parsed.min_price_inr || null,
        max_price_inr: parsed.max_price_inr || null,
        status: parsed.status || 'Under Construction',
        possession: parsed.possession || null,
        usp: parsed.usp || null,
        description: parsed.description || null,
        amenities: Array.isArray(parsed.amenities) ? parsed.amenities : [],
        faqs: cleanFaqs(parsed.faqs),
        gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
        hero_image: parsed.hero_image || null,
        brochure_url: parsed.brochure_url || null,
        map_embed_url: parsed.map_embed_url || null,
        seo_title: parsed.seo_title || null,
        meta_description: parsed.meta_description || null,
        canonical_url: parsed.canonical_url || `https://www.naani.in/projects/${slug}`,
        custom_page_path: parsed.custom_page_path || `/projects/${slug}`,
        featured: parsed.featured !== undefined ? parsed.featured : true,
        publish_status: parsed.publish_status || 'published',
        submitted_at: parsed.submitted_at || null,
        published_at: parsed.published_at || new Date().toISOString(),
        source: parsed.source || 'migration',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      catalogueMap.set(slug, newRecord);
      idToSlugMap.set(newId, slug);
      console.log(`  Added NEW project from migration: "${slug}" (Generated UUID: ${newId})`);
    }
  }

  // --- STEP 3: Process Dedicated React Project Pages (Genuinely New Projects) ---
  console.log(`\n[Source 3: Dedicated React Project Pages] Processing newly developed project pages...`);

  const dedicatedNewProjects = [
    {
      slug: 'rise-with-9-neopolis-kokapet',
      name: 'Rise With 9',
      builder: 'De Blueoak and P Mangatram Properties LLP',
      location: 'Neopolis, Kokapet',
      city: 'Hyderabad',
      configuration: '3 & 4 BHK Ultra-Luxury High-Rise Residences',
      bhk_list: [3, 4],
      property_type: 'Apartment',
      price_range: 'Contact for Price',
      min_price_inr: 25000000,
      max_price_inr: 60000000,
      status: 'Under Construction',
      possession: '2029-12-31',
      usp: 'Neopolis Kokapet · 2 Ultra-Luxury High-Rise Towers (9 North & 9 South) · Double-Height Living Spaces · 18th-Hour Waterfall · Elevated Sky Amenities · TG RERA P02400009942',
      description: 'Rise With 9 – The Trilight Residences is an ultra-luxury high-rise residential development located at Plot No. 9, Neopolis Layout, Kokapet, Hyderabad. Spread across two iconic architectural towers (9 North and 9 South), it features large-format 3 & 4 BHK residences with double-height ceiling formats, signature 18th-hour waterfall courtyard, exclusive 9th House clubhouse, panoramic Neopolis skyline vistas, and rapid connectivity to the Financial District and ORR Exit 1A.',
      amenities: [
        '18th-Hour Waterfall Courtyard',
        '9th House Private Clubhouse',
        'Infinity Sky Pool & Sun Deck',
        'Double-Height Grand Lobby',
        'High-Tech Gymnasium & Aerobics Studio',
        'Executive Business Lounge & Co-Working Suites',
        'Private Screening Cinema',
        'Landscaped Sky Gardens & Viewing Decks',
        'Badminton & Squash Courts',
        'Multi-Tier 24/7 Security & Access Control'
      ],
      faqs: [
        { q: 'What is Rise With 9?', a: 'Rise With 9 – The Trilight Residences is an ultra-luxury high-rise residential development located in Neopolis, Kokapet, Hyderabad featuring two architectural towers with large-format 3 & 4 BHK residences, double-height living spaces, and elevated sky amenities.' },
        { q: 'Where is Rise With 9 located?', a: 'The project is situated at Plot No. 9, Neopolis Layout, Kokapet, Hyderabad, Telangana – 500075, adjacent to ORR Neopolis Exit 1A.' },
        { q: 'Who is developing Rise With 9?', a: 'Rise With 9 is developed by De Blueoak and P Mangatram Properties LLP.' },
        { q: 'Is Rise With 9 RERA approved?', a: 'Yes, registered under Telangana RERA registration number P02400009942.' }
      ],
      gallery: [
        '/assets/rise-with-9/rise-with-9-trilight-hero.jpg',
        '/assets/rise-with-9/rise-with-9-elevation-night.jpg',
        '/assets/rise-with-9/rise-with-9-18th-hour-waterfall.jpg',
        '/assets/rise-with-9/rise-with-9-clubhouse-9th-house.jpg'
      ],
      hero_image: '/assets/rise-with-9/rise-with-9-trilight-hero.jpg',
      brochure_url: null,
      map_embed_url: 'https://www.google.com/maps?q=Neopolis+Kokapet+Hyderabad&output=embed',
      seo_title: 'Rise With 9 Neopolis Kokapet | 3 & 4 BHK Luxury Apartments Hyderabad',
      meta_description: 'Discover Rise With 9 in Neopolis, Kokapet, Hyderabad. Ultra-luxury 3 & 4 BHK high-rise residences with double-height living, 9th House clubhouse, and sky amenities. TG RERA P02400009942.',
      canonical_url: 'https://www.naani.in/projects/rise-with-9-neopolis-kokapet',
      custom_page_path: '/projects/rise-with-9',
      featured: true
    },
    {
      slug: 'linq-by-raghava',
      name: 'LINQ by Raghava',
      builder: 'Raghava Projects',
      location: 'Neopolis, Kokapet',
      city: 'Hyderabad',
      configuration: '3 BHK Ultra-Luxury High-Rise Residences',
      bhk_list: [3],
      property_type: 'Apartment',
      price_range: 'Contact for Latest Pricing',
      min_price_inr: 22000000,
      max_price_inr: 35000000,
      status: 'Under Construction',
      possession: '2030-06-30',
      usp: '9.2 Acres · Four 58-Storey Towers · 5.5 Lakh Sq.Ft. Lifestyle Amenities · Rooftop Sky Bridge · Near Neopolis Exit 1A · TG RERA P0240011056',
      description: 'LINQ by Raghava is an ultra-luxury 3 BHK high-rise gated community developed by Raghava Projects across 9.2 acres in Kokapet near Neopolis, Hyderabad. Soaring 58 storeys across four towers, the development offers over 5.5 lakh sq.ft. of world-class amenities including an iconic elevated sky bridge, rooftop infinity pools, multi-tier sports clubs, and seamless 8-minute connectivity to the Financial District.',
      amenities: [
        '5.5 Lakh Sq.Ft. Lifestyle Amenities',
        'Iconic Rooftop Sky Bridge Connecting Towers',
        'Infinity Sky Pool & Observation Deck',
        'Multi-Level Grand Clubhouse',
        'State-of-the-Art Fitness Center & Spa',
        'Indoor Badminton & Tennis Courts',
        'Co-Working Business Lounges',
        'Landscaped Central Greens & Jogging Trails',
        "Children's Adventure Play Park",
        '24/7 Multi-Tier Smart Security'
      ],
      faqs: [
        { q: 'What is LINQ by Raghava?', a: 'LINQ by Raghava is an ultra-luxury 3 BHK residential community developed by Raghava Projects across 9.2 acres in Kokapet near Neopolis with four 58-storey towers.' },
        { q: 'Where is LINQ by Raghava located?', a: 'LINQ by Raghava is located in Kokapet, Neopolis, Hyderabad, Telangana – 500075, within 5 minutes of Kokapet ORR Exit and 8 minutes of Financial District.' },
        { q: 'Is LINQ by Raghava RERA approved?', a: 'Yes, registered with Telangana RERA under registration number P0240011056.' }
      ],
      gallery: [
        '/assets/linq-by-raghava/linq-by-raghava-elevation-hero.jpg',
        '/assets/linq-by-raghava/linq-by-raghava-sky-bridge.jpg',
        '/assets/linq-by-raghava/linq-by-raghava-master-layout-plan.png',
        '/assets/linq-by-raghava/linq-by-raghava-sky-amenities-rooftop.jpg'
      ],
      hero_image: '/assets/linq-by-raghava/linq-by-raghava-elevation-hero.jpg',
      brochure_url: null,
      map_embed_url: 'https://www.google.com/maps?q=Neopolis+Kokapet+Hyderabad&output=embed',
      seo_title: 'LINQ by Raghava Kokapet Neopolis | Luxury 3 BHK Apartments Hyderabad',
      meta_description: 'Explore LINQ by Raghava in Neopolis Kokapet, Hyderabad. Ultra-luxury 3 BHK high-rise apartments across 4 towers of 58 storeys with 5.5L sq.ft. amenities. TG RERA P0240011056.',
      canonical_url: 'https://www.naani.in/projects/linq-by-raghava',
      custom_page_path: '/projects/linq-by-raghava',
      featured: true
    },
    {
      slug: 'candeur-eternia-bachupally-hyderabad',
      name: 'Candeur Eternia',
      builder: 'Candeur Constructions',
      location: 'Bachupally',
      city: 'Hyderabad',
      configuration: '2, 2.5 & 3 BHK Premium High-Rise Residences',
      bhk_list: [2, 3],
      property_type: 'Apartment',
      price_range: '₹85 Lakhs – ₹1.65 Cr',
      min_price_inr: 8500000,
      max_price_inr: 16500000,
      status: 'Under Construction',
      possession: '2028-12-31',
      usp: '73,000 Sq.Ft. 5-Level Clubhouse · Premium 2 & 3 BHK Formats · Near Miyapur Metro & ORR · TG RERA P02200010709',
      description: 'Candeur Eternia is a landmark premium high-rise gated residential community developed by Candeur Constructions in Bachupally, Hyderabad. Featuring premium 2, 2.5 and 3 BHK residences, the project includes an iconic 73,000 sq.ft. multi-level clubhouse, rooftop infinity pool, landscaped open podiums, and rapid connectivity to Miyapur Metro, Kukatpally, and the Outer Ring Road.',
      amenities: [
        '73,000 Sq.Ft. 5-Level Clubhouse',
        'Rooftop Swimming Pool & Kids Pool',
        'Modern Gymnasium & Yoga Studio',
        'Indoor Badminton & Squash Courts',
        "Children's Adventure Play Area",
        'Landscaped Theme Gardens',
        'Jogging & Cycling Tracks',
        'EV Charging Infrastructure',
        '100% DG Power Backup',
        '24/7 Security with CCTV Surveillance'
      ],
      faqs: [
        { q: 'Where is Candeur Eternia located?', a: 'Candeur Eternia is located in Bachupally, Hyderabad with seamless connectivity to Miyapur Metro, HITEC City, Kukatpally and ORR.' },
        { q: 'What configurations are available?', a: 'Premium 2 BHK (1462 / 1546 sft), 3B2T (1590 / 1619 sft) and 3B3T (1711 / 1874 / 2004 / 2192 sft) apartments.' },
        { q: 'Is the project RERA approved?', a: 'Yes. Candeur Eternia is RERA approved with registration number P02200010709.' }
      ],
      gallery: [
        '/assets/candeur-eternia/hero.png',
        '/assets/candeur-eternia/clubhouse.png',
        '/assets/candeur-eternia/towers.png',
        '/assets/candeur-eternia/masterplan.png',
        '/assets/candeur-eternia/payment-plan.png'
      ],
      hero_image: '/assets/candeur-eternia/hero.png',
      brochure_url: null,
      map_embed_url: 'https://www.google.com/maps?q=Bachupally+Hyderabad&output=embed',
      seo_title: 'Candeur Eternia Bachupally Hyderabad | Premium Apartments | Naani Projects',
      meta_description: 'Explore Candeur Eternia in Bachupally, Hyderabad featuring premium 2, 2.5 & 3 BHK apartments with luxury amenities, excellent connectivity, and world-class lifestyle features. TG RERA P02200010709.',
      canonical_url: 'https://www.naani.in/projects/candeur-eternia-bachupally-hyderabad',
      custom_page_path: '/projects/candeur-eternia-bachupally-hyderabad',
      featured: true
    },
    {
      slug: 'godrej-kukatpally-hyderabad',
      name: 'Godrej Kukatpally Hyderabad',
      builder: 'Godrej Properties',
      location: 'Kukatpally',
      city: 'Hyderabad',
      configuration: '3 & 4 BHK Ultra-Luxury High-Rise Residences',
      bhk_list: [3, 4],
      property_type: 'Apartment',
      price_range: '₹2.50 Cr Onwards (Contact for Live Price Sheet)',
      min_price_inr: 25000000,
      max_price_inr: 45000000,
      status: 'Pre-Launch',
      possession: '2030-12-31',
      usp: '7.8 Acres · 2 Iconic Towers (G+46 Storeys) · Near KPHB Phase IV & HITEC City · Ultra-Luxury Signature Living',
      description: 'Godrej Kukatpally Hyderabad is an ultra-luxury high-rise residential landmark developed by Godrej Properties across 7.8 acres in KPHB Phase IV, Kukatpally, Hyderabad. Soaring G+46 floors across two iconic towers, the development offers spacious 3 & 4 BHK residences, world-class resort amenities, zero common walls, and prime connectivity to HITEC City, Cyber Towers, and the Financial District.',
      amenities: [
        'Grand Multi-Level Clubhouse',
        'Olympic-Length Swimming Pool & Pool Deck',
        'State-of-the-Art Gymnasium & Fitness Center',
        'Dedicated Yoga & Meditation Lawn',
        'Indoor Squash & Badminton Courts',
        "Children's Creative Play Park",
        'Landscaped Zen Gardens',
        'Jogging Track & Walking Trails',
        'Multi-Tier Intelligent Security',
        '100% Power Backup & EV Charging'
      ],
      faqs: [
        { q: 'Where is Godrej Kukatpally located?', a: 'Godrej Kukatpally is located at KPHB Phase IV, Kukatpally, Hyderabad with metro connectivity and direct access to HITEC City and the Financial District.' },
        { q: 'What configurations are available?', a: 'Ultra-luxury 3 & 4 BHK apartments across 2 high-rise G+46 towers.' },
        { q: 'Who is the developer of Godrej Kukatpally?', a: 'The project is developed by Godrej Properties, one of India’s most trusted real estate developers.' }
      ],
      gallery: [
        '/assets/godrej-kukatpally/hero.jpg',
        '/assets/godrej-kukatpally/floor-plan.png',
        '/assets/godrej-kukatpally/aerial.png',
        '/assets/godrej-kukatpally/masterplan.png'
      ],
      hero_image: '/assets/godrej-kukatpally/hero.jpg',
      brochure_url: null,
      map_embed_url: 'https://www.google.com/maps?q=KPHB+Phase+IV+Kukatpally+Hyderabad&output=embed',
      seo_title: 'Godrej Kukatpally Hyderabad | Luxury 3 & 4 BHK Apartments',
      meta_description: 'Explore Godrej Kukatpally Hyderabad, an ultra-luxury high-rise residential project offering premium 3 & 4 BHK apartments near HITEC City with world-class amenities and excellent connectivity.',
      canonical_url: 'https://www.naani.in/projects/godrej-kukatpally-hyderabad',
      custom_page_path: '/projects/godrej-kukatpally-hyderabad',
      featured: true
    },
    {
      slug: 'trump-towers-hyderabad-kokapet',
      name: 'Trump Towers Hyderabad',
      builder: 'Ira The Edge Developers LLP / Tribeca Developers',
      location: 'Golden Mile, Kokapet',
      city: 'Hyderabad',
      configuration: '3.5, 4, 4.5 & 6 BHK Branded Sky Residences',
      bhk_list: [3, 4, 6],
      property_type: 'Apartment',
      price_range: '₹4.50 Cr – ₹12.00 Cr+',
      min_price_inr: 45000000,
      max_price_inr: 120000000,
      status: 'Under Construction',
      possession: '2031-05-15',
      usp: '4.04 Acres · Twin 65-Storey Skyscraper Towers · Private Elevators · Three-Level Floating Trump Club · Golden Mile Kokapet · TG RERA P02400010871',
      description: 'Trump Towers Hyderabad is an ultra-luxury branded residential development located in Golden Mile, Kokapet, Hyderabad. Developed by Ira The Edge Developers LLP with Tribeca Developers across ~4.04 acres, it features two iconic 65-storey towers offering 3.5, 4, 4.5, and 6 BHK sky residences with private elevator vestibules, expansive decks, and a signature three-level floating Trump Club suspended between the towers.',
      amenities: [
        'Three-Level Floating Cantilevered Trump Club',
        'Infinity-Edge Sky Pool & Private Cabanas',
        'Specialty Fine Dining Restaurant & Cigar Lounge',
        'Executive Business Centre & Boardrooms',
        'Full-Service Spa & Wellness Salons',
        'Private Screening Theatre & Entertainment Arcades',
        'High-Tech Gymnasium & Yoga Studios',
        'Private Elevator Access to Every Unit',
        'Multi-Tier 24/7 Concierge & Security Services',
        'Landscaped Golden Mile Greens'
      ],
      faqs: [
        { q: 'What is Trump Towers Hyderabad?', a: 'Trump Towers Hyderabad is an ultra-luxury branded residential development located in Golden Mile, Kokapet, Hyderabad featuring two iconic 65-storey towers offering 3.5, 4, 4.5, and 6 BHK sky residences with private elevators and a three-level floating Trump Club.' },
        { q: 'Where is Trump Towers Hyderabad located?', a: 'Trump Towers Hyderabad is located in Golden Mile, Kokapet, Gandipet Mandal, Hyderabad, Telangana – 500075, adjacent to Neopolis and Financial District with direct connectivity to ORR Exit 1A.' },
        { q: 'Who is the developer of Trump Towers Hyderabad?', a: 'The official developer and promoter registered under Telangana RERA is Ira The Edge Developers LLP, with Tribeca Developers as official development partner.' },
        { q: 'What is the RERA registration number for Trump Towers Hyderabad?', a: 'The project is registered with Telangana RERA under registration number P02400010871.' }
      ],
      gallery: [
        '/assets/trump-towers/hero.jpg',
        '/assets/trump-towers/elevation-upward.jpg',
        '/assets/trump-towers/elevation-diagram.png',
        '/assets/trump-towers/entrance.png',
        '/assets/trump-towers/logo-card.png'
      ],
      hero_image: '/assets/trump-towers/hero.jpg',
      brochure_url: null,
      map_embed_url: 'https://www.google.com/maps?q=Kokapet+Golden+Mile+Hyderabad&output=embed',
      seo_title: 'Trump Towers Hyderabad Kokapet | Luxury Branded Residences',
      meta_description: "Explore Trump Towers Hyderabad in Kokapet's Golden Mile. Discover 65-storey twin towers, private elevators, large-format residences, the three-level Trump Club and West Hyderabad connectivity. TG RERA P02400010871.",
      canonical_url: 'https://www.naani.in/projects/trump-towers-hyderabad-kokapet',
      custom_page_path: '/projects/trump-towers-hyderabad-kokapet',
      featured: true
    }
  ];

  for (const p of dedicatedNewProjects) {
    if (catalogueMap.has(p.slug)) {
      console.log(`  Project ${p.slug} already exists; merging data.`);
      const existing = catalogueMap.get(p.slug);
      Object.assign(existing, p, { id: existing.id, slug: existing.slug, updated_at: new Date().toISOString() });
    } else {
      stats.pageAdditions++;
      const newId = crypto.randomUUID();
      const newRecord = {
        ...p,
        id: newId,
        publish_status: 'published',
        submitted_at: null,
        published_at: new Date().toISOString(),
        source: 'react_page',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      catalogueMap.set(p.slug, newRecord);
      idToSlugMap.set(newId, p.slug);
      console.log(`  Added NEW project from React page: "${p.slug}" (Generated UUID: ${newId})`);
    }
  }

  // --- STEP 4: Enrich Incomplete Existing Records from Dedicated Pages, Fallbacks & sanviProjects.ts ---
  console.log(`\n[Source 4: Enrichments] Enriching existing incomplete records...`);

  // 4A: Neo Towers / NEO by Yula Globus (bb3b74bb-4e6d-4421-b39b-196c810992ef)
  if (catalogueMap.has('neo-by-yula-globus')) {
    const neo = catalogueMap.get('neo-by-yula-globus');
    stats.pageEnrichments++;
    neo.name = 'Neo Towers (NEO by Yula Globus)';
    neo.builder = 'Yula Globus Developers LLP';
    neo.location = 'Neopolis, Kokapet';
    neo.configuration = '3 & 4 BHK Uber-Luxury Sky Residences (2,750 – 5,800 Sq.Ft.)';
    neo.bhk_list = [3, 4];
    neo.price_range = '₹2.14 Cr – ₹4.79 Cr';
    neo.usp = 'Plot No. 11, Neopolis · 4.36 Acres · Twin 57-Storey Towers · 180° Panoramic Views · Club Neo · Sky Office Facilities · TG RERA P02400010006';
    neo.description = 'Neo Towers (registered under RERA as NEO by Yula Globus) is an uber-premium high-rise residential development located in Plot No. 11, Neopolis Layout, Kokapet, Hyderabad. Spanning 4.36 acres, it features two iconic 57-storey towers offering luxurious 3 & 4 BHK residences, panoramic 180° views, dedicated Sky Office co-working facilities, and Club Neo with comprehensive lifestyle amenities.';
    neo.amenities = [
      'Club Neo Grand Clubhouse',
      'Panoramic Skydeck at 57 Storeys',
      'Sky Office Co-Working Business Suites',
      'Temperature-Controlled Indoor & Outdoor Pools',
      'High-Tech Gymnasium & Aerobics Studio',
      'Indoor Badminton & Squash Courts',
      'Multi-Tier 24/7 Security & Access Control',
      'Landscaped Theme Gardens',
      "Children's Creative Play Park",
      'EV Charging & 100% DG Backup'
    ];
    neo.hero_image = '/assets/neo-towers/tower-a.webp';
    neo.gallery = [
      '/assets/neo-towers/tower-a.webp',
      '/assets/neo-towers/tower-b.jpg',
      '/assets/neo-towers/club-neo.png',
      '/assets/neo-towers/color-building.png',
      '/assets/neo-towers/skydeck.png'
    ];
    neo.custom_page_path = '/projects/neo-towers-neopolis-kokapet';
    neo.canonical_url = 'https://www.naani.in/projects/neo-towers-neopolis-kokapet';
    neo.seo_title = 'Neo Towers Neopolis Kokapet Hyderabad | 3 & 4 BHK Apartments';
    neo.meta_description = 'Explore Neo Towers in Neopolis, Kokapet, Hyderabad. Discover 3 & 4 BHK residences, 57-storey towers, sky amenities, Club Neo, Sky Office, Skydeck and West Hyderabad connectivity. TG RERA P02400010006.';
    neo.updated_at = new Date().toISOString();
    console.log('  Enriched neo-by-yula-globus from NeoTowersPage.tsx');
  }

  // 4B: Sanvi projects from sanviProjects.ts
  const sanviEnrichments = [
    {
      slug: 'sanvis-kowsalya-vasudha-mallampet',
      name: "Sanvi's Kowsalya Vasudha",
      builder: 'Sanvi Infra Projects Private Limited',
      location: 'Mallampet',
      usp: 'Near ORR Exit 4A · 4.5 Acres · 5 Towers (G+10) · 15,000 Sft Clubhouse · 100% Vaastu · TG RERA P02200003251',
      description: "Sanvi's Kowsalya Vasudha is a premium 4.5-acre gated residential township developed by Sanvi Infra Projects in Mallampet, Hyderabad near ORR Exit 4A. Features 5 towers of G+10 floors, a 15,000 sq.ft. clubhouse, and 2 & 3 BHK homes with zero common walls.",
      hero_image: '/assets/sanvi/vasudha-elevation.jpg',
      amenities: ['15,000 Sft Grand Clubhouse', 'Swimming Pool & Splash Pool', 'AC Gymnasium', 'Indoor Badminton Court', 'Landscaped Central Park', 'Children Play Area', 'Jogging Track', '24/7 Security & CCTV', '100% DG Power Backup'],
      faqs: [
        { q: "Where is Sanvi's Kowsalya Vasudha located?", a: 'Located near ORR Exit 4A in Mallampet, North-West Hyderabad, with fast connectivity to Bachupally, Miyapur, and HITEC City.' },
        { q: "Is Sanvi's Kowsalya Vasudha RERA approved?", a: 'Yes, registered with Telangana RERA under TG RERA P02200003251.' }
      ]
    },
    {
      slug: 'sanvi-kowsalya-manidweepa-shikaram-bachupally',
      name: 'Sanvi Kowsalya Manidweepa Shikaram',
      builder: 'Sanvi Infra Projects Private Limited',
      location: 'Bachupally',
      usp: 'Prime Bachupally · 3.2 Acres · G+10 Towers · 16,000 Sft Clubhouse · Near Silver Oaks & Oakridge · TG RERA P02200004128',
      description: 'Sanvi Kowsalya Manidweepa Shikaram is a modern gated community by Sanvi Infra Projects in Bachupally, Hyderabad. Spread across 3.2 acres with G+10 towers, featuring a 16,000 sq.ft. clubhouse and premium 2 & 3 BHK layouts near top schools.',
      hero_image: '/assets/sanvi/shikaram-elevation.jpg',
      amenities: ['16,000 Sft Multi-Level Clubhouse', 'Swimming Pool', 'Gymnasium & Yoga Studio', 'Indoor Games Arena', 'Children Play Zone', 'Landscaped Gardens', 'EV Charging Station', '100% DG Power Backup'],
      faqs: [
        { q: 'Where is Sanvi Manidweepa Shikaram located?', a: 'Located in Bachupally, Hyderabad near reputed schools like Silver Oaks, Oakridge, and Kennedy High.' },
        { q: 'Is Sanvi Manidweepa Shikaram RERA approved?', a: 'Yes, registered under TG RERA P02200004128.' }
      ]
    },
    {
      slug: 'sanvi-kowsalya-avani-kristareddypet',
      name: 'Sanvi Kowsalya Avani',
      builder: 'Sanvi Infra Projects Private Limited',
      location: 'Kristareddypet',
      usp: 'Kristareddypet · 5.2 Acres · 6 Towers (G+11) · 21,000 Sft Clubhouse · Flagship Sanvi Community · TG RERA P02200005234',
      description: 'Sanvi Kowsalya Avani is the flagship 5.2-acre luxury gated community developed by Sanvi Infra Projects in Kristareddypet, near Ameenpur and Miyapur, Hyderabad. Boasts 6 towers of G+11 floors, a grand 21,000 sq.ft. clubhouse, and 70% open spaces.',
      hero_image: '/assets/sanvi/avani-elevation.jpg',
      amenities: ['21,000 Sft Grand Clubhouse', 'Olympic-Length Swimming Pool', 'Modern Fitness Center', 'Badminton & Squash Courts', 'Co-Working Business Lounges', 'Landscaped Central Park', '24/7 Security Surveillance'],
      faqs: [
        { q: 'Where is Sanvi Kowsalya Avani located?', a: 'Located in Kristareddypet near Ameenpur, Hyderabad, offering rapid access to Miyapur Metro and the Financial District.' },
        { q: 'Is Sanvi Kowsalya Avani RERA approved?', a: 'Yes, registered under TG RERA P02200005234.' }
      ]
    }
  ];

  for (const s of sanviEnrichments) {
    if (catalogueMap.has(s.slug)) {
      stats.pageEnrichments++;
      const p = catalogueMap.get(s.slug);
      Object.assign(p, s, { id: p.id, slug: p.slug, updated_at: new Date().toISOString() });
      console.log(`  Enriched ${s.slug} from sanviProjects.ts`);
    }
  }

  // 4C: Other enriched project records (including Prestige, Brigade, Tridasa, and Aritha)
  const pageEnrichmentsList = [
    {
      slug: 'team4-aria-miyapur-luxury-apartments-hyderabad',
      hero_image: '/assets/team4-aria/hero.png',
      description: 'Team4 Aria is an ultra-luxury high-rise residential gated community in Miyapur, Hyderabad featuring 3 & 3.5 BHK luxury residences with a 3.5-acre central courtyard, infinity pool, and premium lifestyle amenities near Miyapur Metro.',
      amenities: ['3.5-Acre Central Courtyard', 'Infinity Swimming Pool', 'Modern Clubhouse', 'Fitness Center', 'Sports Courts', 'Children Play Zone', 'Landscaped Gardens', '24/7 Security'],
      faqs: [{ q: 'Where is Team4 Aria located?', a: 'Located in Miyapur, Hyderabad near Miyapur Metro Station with quick connectivity to HITEC City.' }]
    },
    {
      slug: 'rajapushpa-sierra-tellapur-hyderabad',
      hero_image: '/assets/rajapushpa-sierra/hero.webp',
      description: 'Rajapushpa Sierra is a premium G+49 high-rise residential community in Tellapur, Hyderabad near Gachibowli and Financial District offering luxury 2 & 3 BHK homes with grand clubhouse and resort amenities.',
      amenities: ['Grand Clubhouse', 'Swimming Pool', 'Gymnasium', 'Tennis & Badminton Courts', 'Landscaped Lawns', '24/7 Security'],
      faqs: [{ q: 'Where is Rajapushpa Sierra located?', a: 'Located in Tellapur, Hyderabad near Gachibowli and the Financial District.' }]
    },
    {
      slug: 'aspire-spaces-a3-bachupally',
      hero_image: '/assets/aspire-a3-elevation.jpg',
      description: 'Aspire Spaces Aarna (A3) is a premium high-rise residential community in Bachupally near ORR Exit 4A, Hyderabad, featuring luxury 2 & 3 BHK apartments with rooftop pool, grand clubhouse, and world-class amenities.',
      amenities: ['Rooftop Swimming Pool', 'Luxury Clubhouse', 'Gymnasium', 'Multipurpose Court', 'Crèche & Library', '24/7 Security'],
      faqs: [{ q: 'Where is Aspire Spaces Aarna located?', a: 'Located in Bachupally near ORR Exit 4A with rapid connectivity to Miyapur and HITEC City.' }]
    },
    {
      slug: 'jaycon-gateway-tirupati',
      hero_image: '/assets/jaycon/elevation-collage.png',
      description: 'Jaycon Gateway Tirupati offers premium managed suites near Tirumala with passive rental income opportunities and hotel-grade amenities.',
      amenities: ['Swimming Pool', 'Fitness Center', 'Fine Dining Restaurant', 'Business Suites', '24/7 Concierge'],
      faqs: [{ q: 'Where is Jaycon Gateway located?', a: 'Located in Tirupati near the Tirumala foothills.' }]
    },
    {
      slug: 'man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad',
      description: 'Man Airport Residency is a luxury ready-to-occupy 4 BHK villa gated community located in Tukkuguda, Hyderabad near Rajiv Gandhi International Airport (RGIA).',
      amenities: ['Swimming Pool', 'AC Gymnasium', 'Clubhouse', 'Children Play Area', 'Landscaped Gardens', '24/7 Gated Security'],
      faqs: [{ q: 'Where is Man Airport Residency located?', a: 'Located in Tukkuguda near RGIA Airport and the Outer Ring Road.' }]
    },
    {
      slug: 'sri-soho-interiors-designers-hyderabad',
      hero_image: '/assets/sri-soho/hero.jpg',
      description: 'Sri Soho Interiors is a premium interior design and turnkey execution partner for luxury apartments and villas across Hyderabad.',
      amenities: ['Turnkey Interior Design', '3D Visualisation', 'Custom Modular Kitchens', 'Premium Wardrobes', 'False Ceiling & Lighting'],
      faqs: [{ q: 'What services does Sri Soho Interiors provide?', a: 'Complete end-to-end interior design and execution for residential properties in Hyderabad.' }]
    },
    {
      slug: 'raghava-halo-kondapur-hyderabad',
      description: 'Raghava Halo is an ultra-luxury residential project by Raghava in Kondapur, Hyderabad offering expansive 3 BHK homes from 1830 to 2895 sq.ft. with signature wellness retreats and red light therapy amenities.',
      amenities: ['Wellness Retreat with Red Light Therapy', 'Infinity Pool', 'Modern Fitness Center', 'Executive Lounges', 'Landscaped Podium'],
      faqs: [{ q: 'Where is Raghava Halo located?', a: 'Located in Kondapur near HITEC City and Gachibowli.' }]
    },
    {
      slug: 'aritha-gbr-dhanwin-towers-bowrampet-hyderabad',
      hero_image: '/assets/aritha-dhanwin/facade-day.jpg',
      gallery: ['/assets/aritha-dhanwin/facade-day.jpg', '/assets/aritha-dhanwin/elevation-aerial.jpg', '/assets/aritha-dhanwin/courtyard-night.jpg', '/assets/aritha-dhanwin/garden-day.jpg'],
      description: 'Aritha GBR Dhanwin Towers is a premium gated residential apartment development in Bowrampet, Hyderabad offering 2 & 3 BHK homes from 1165 to 2355 sq.ft. with clubhouse and lifestyle amenities near ORR.',
      amenities: ['Clubhouse', 'Swimming Pool', 'Kids Pool', 'Gymnasium', 'Landscaped Gardens', '24/7 Security'],
      faqs: [{ q: 'Where is Aritha GBR Dhanwin Towers located?', a: 'Located in Bowrampet, Hyderabad near the Outer Ring Road.' }]
    },
    {
      slug: 'prestige-golden-grove-hyderabad',
      hero_image: '/assets/prestige/elevation.jpg',
      description: 'Prestige Golden Grove is an expansive 28.7-acre luxury residential apartment township by Prestige Group in Tellapur near ORR Exit 2, West Hyderabad, offering 2, 3 & 4 BHK apartments with 10 high-rise towers and comprehensive amenities.',
      amenities: ['Grand Clubhouse Facilities', 'Olympic-Length Swimming Pool', 'Fitness Center', 'Jogging Track', 'Tennis & Squash Courts', 'Children Play Area', '24/7 Security'],
      faqs: [
        { q: 'What is Prestige Golden Grove Hyderabad?', a: 'Prestige Golden Grove is a premium luxury apartment township by Prestige Group, spread across 28.7 acres in Tellapur, near Kollur, West Hyderabad with 10 high-rise towers (3P+52 floors).' },
        { q: 'Where is Prestige Golden Grove located?', a: 'Located in Tellapur, near Kollur off ORR Exit 2, West Hyderabad, just 15 minutes from Gachibowli and HITEC City IT hubs.' },
        { q: 'What is the price of Prestige Golden Grove apartments?', a: 'Prices start from ₹93.5 Lakhs for 2 BHK apartments up to ₹2.04 Crores for 4 BHK apartments.' }
      ]
    },
    {
      slug: 'brigade-gateway-neopolis-kokapet-hyderabad',
      hero_image: '/assets/brigade/elevation.png',
      description: 'Brigade Gateway Neopolis is a signature ultra-luxury skyscraper development by Brigade Group located in Neopolis, Kokapet, Hyderabad featuring 3 & 4 BHK sky residences with private lift lobbies, sky lounge, and panoramic lake views.',
      amenities: ['Infinity Sky Pool', 'Sky Lounge & Observation Deck', 'Private Lift Lobbies', 'Concierge Service', 'High-Tech Gymnasium', 'Squash Court', '24/7 Security'],
      faqs: [
        { q: 'What is Brigade Gateway Neopolis?', a: 'Brigade Gateway Neopolis is an ultra-luxury skyscraper apartment project by Brigade Group in Neopolis, Kokapet, Hyderabad featuring 45-storey skyscrapers with private lift lobbies and sky lounges.' }
      ]
    },
    {
      slug: 'tridasa-rise',
      hero_image: '/assets/tridasa/clubhouse-elevation.png',
      gallery: ['/assets/tridasa/clubhouse-elevation.png', '/assets/tridasa/master-plan.png', '/assets/tridasa/location-map.png'],
      description: 'Tridasa Rise is a premium IGBC Gold rated high-rise gated community in Nallagandla, Hyderabad spread across 10.38 acres with 7 blocks, a 55,000 sq.ft. clubhouse, temperature-controlled pool, and 5-minute access to Financial District.',
      amenities: ['55,000 sq.ft. Clubhouse', 'Infinity Pool', 'Squash Court', 'Gymnasium', 'Landscaped Gardens', 'Tennis Court', 'Jogging Track'],
      faqs: [
        { q: 'What is Tridasa Rise Nallagandla?', a: 'Tridasa Rise is a luxury 3 and 4 BHK high-rise residential project spread across 10.38 acres in Nallagandla, Hyderabad.' }
      ]
    }
  ];

  for (const item of pageEnrichmentsList) {
    if (catalogueMap.has(item.slug)) {
      stats.pageEnrichments++;
      const p = catalogueMap.get(item.slug);
      Object.assign(p, item, { id: p.id, slug: p.slug, updated_at: new Date().toISOString() });
      console.log(`  Enriched ${item.slug} from React page / fallback dictionary`);
    }
  }

  // --- STEP 5: Integrity Validation & Audit ---
  console.log(`\n--- Quality & Completeness Audit ---`);

  const consolidatedList = Array.from(catalogueMap.values());
  stats.totalConsolidated = consolidatedList.length;

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const seenIds = new Set();
  const seenSlugs = new Set();
  const failedValidation = [];

  for (let i = 0; i < consolidatedList.length; i++) {
    const item = consolidatedList[i];
    const ref = `[${i + 1}] "${item.name}" (${item.slug})`;

    // Check UUID
    if (!item.id || !uuidRegex.test(item.id)) {
      failedValidation.push(`${ref}: Invalid or missing UUID ("${item.id}")`);
    } else if (seenIds.has(item.id)) {
      failedValidation.push(`${ref}: Duplicate UUID collision ("${item.id}")`);
    }
    seenIds.add(item.id);

    // Check Slug
    if (!item.slug || typeof item.slug !== 'string') {
      failedValidation.push(`${ref}: Missing or invalid slug`);
    } else if (seenSlugs.has(item.slug)) {
      failedValidation.push(`${ref}: Duplicate slug collision ("${item.slug}")`);
    }
    seenSlugs.add(item.slug);

    // Check required fields
    if (!item.name) failedValidation.push(`${ref}: Missing name`);
    if (!item.location) failedValidation.push(`${ref}: Missing location`);
    if (!item.builder) failedValidation.push(`${ref}: Missing builder`);

    // Audit completeness
    const missing = [];
    if (!item.hero_image) missing.push('hero_image');
    if (!item.description) missing.push('description');
    if (!item.amenities || item.amenities.length === 0) missing.push('amenities');
    if (!item.faqs || item.faqs.length === 0) missing.push('faqs');
    if (!item.price_range && !item.min_price_inr) missing.push('pricing');

    if (missing.length > 0) {
      stats.incompleteRecords.push({
        id: item.id,
        slug: item.slug,
        name: item.name,
        builder: item.builder,
        missingFields: missing
      });
    }

    // Ensure publication status
    if (!item.publish_status) item.publish_status = 'published';
  }

  if (failedValidation.length > 0) {
    console.error(`[CRITICAL AUDIT ERRORS] ${failedValidation.length} validation failures:`);
    failedValidation.forEach(e => console.error(`  - ${e}`));
    throw new Error('Consolidation failed validation');
  }

  console.log(`  All ${consolidatedList.length} records passed ID and Slug integrity checks!`);
  console.log(`  Records with minor incomplete fields: ${stats.incompleteRecords.length}`);

  // --- STEP 6: Save Consolidated JSON ---
  fs.writeFileSync(CONSOLIDATED_JSON_PATH, JSON.stringify(consolidatedList, null, 2), 'utf8');
  console.log(`\n[Saved Consolidated Catalogue JSON]`);
  console.log(`  File: ${CONSOLIDATED_JSON_PATH}`);
  console.log(`  Size: ${(fs.statSync(CONSOLIDATED_JSON_PATH).size / 1024).toFixed(1)} KB`);

  // --- STEP 7: Generate Idempotent SQL Seed Script ---
  const columns = [
    'id', 'slug', 'name', 'builder', 'location', 'city',
    'configuration', 'bhk_list', 'property_type', 'price_range',
    'min_price_inr', 'max_price_inr', 'status', 'possession',
    'usp', 'description', 'amenities', 'faqs', 'gallery',
    'hero_image', 'brochure_url', 'map_embed_url', 'seo_title',
    'meta_description', 'canonical_url', 'custom_page_path',
    'featured', 'publish_status', 'submitted_at', 'published_at',
    'source', 'created_at', 'updated_at'
  ];

  const updateColumns = columns.filter(c => c !== 'id' && c !== 'slug');

  let sql = `-- ==============================================================================
-- Dynamic Consolidated Property Catalogue Seed: 20261121000002_seed_property_catalogue.sql
-- Target: lpbdwmpglwdedqdiovqu (Naani.in Primary Production Backend)
-- Total Records: ${consolidatedList.length}
-- Sources Merged:
--   1. Live Production Backup: projects_backup_live_hadxpgwzmvxqslcyykyw_20261121.json (${stats.sourceBackupRecords} baseline records)
--   2. SQL Migrations: 10 files (${stats.migrationAdditions} additions, ${stats.migrationUpdates} updates)
--   3. Dedicated React Pages: (${stats.pageAdditions} additions, ${stats.pageEnrichments} enrichments)
-- Description: Idempotently upserts all valid project records from the complete
-- property catalogue into public.projects. Preserves original UUIDs, slugs,
-- and SEO metadata.
-- ==============================================================================

`;

  const chunkSize = 25;
  for (let i = 0; i < consolidatedList.length; i += chunkSize) {
    const chunk = consolidatedList.slice(i, i + chunkSize);
    sql += `INSERT INTO public.projects (\n  ${columns.join(', ')}\n) VALUES\n`;
    const rowStrings = chunk.map(p => {
      const vals = columns.map(col => escapeSql(col, p[col]));
      return `  (${vals.join(', ')})`;
    });
    sql += rowStrings.join(',\n');
    sql += `\nON CONFLICT (slug) DO UPDATE SET\n`;
    const updateAssignments = updateColumns.map(col => `  ${col} = EXCLUDED.${col}`);
    sql += updateAssignments.join(',\n');
    sql += `;\n\n`;
  }

  fs.writeFileSync(TARGET_SQL_PATH, sql, 'utf8');
  console.log(`\n[Saved Consolidated SQL Seed Script]`);
  console.log(`  File: ${TARGET_SQL_PATH}`);
  console.log(`  Size: ${(sql.length / 1024).toFixed(1)} KB`);
  console.log(`  Batch Chunks: ${Math.ceil(consolidatedList.length / chunkSize)}`);

  console.log('\n================================================================');
  console.log('CONSOLIDATION COMPLETED SUCCESSFULLY!');
  console.log('================================================================\n');

  return stats;
}

if (process.argv[1] && process.argv[1].endsWith('build_consolidated_catalogue.mjs')) {
  const result = buildConsolidatedCatalogue();
  console.log('Summary stats:', JSON.stringify(result, null, 2));
}
