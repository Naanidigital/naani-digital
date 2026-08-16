import { useState } from "react";
import { Download, Lock, CheckCircle2, MessageCircle, Phone, X, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveLeadProfile, sendLeadToSheet, type LookingFor, LOOKING_FOR_OPTIONS, detectPageContext } from "@/lib/leadProfile";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brochureUrl?: string | null;
  projectName: string;
  projectId?: string;
}

export const BrochureGateModal = ({ open, onOpenChange, brochureUrl, projectName, projectId }: Props) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    whatsapp: "",
    lookingFor: "3 BHK" as LookingFor,
  });
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("Please enter your full name");
      return;
    }
    if (!/^[+0-9 \-()]{7,16}$/.test(form.phone.trim())) {
      setError("Please enter a valid mobile number");
      return;
    }
    setError("");
    setSubmitting(true);

    const profile = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      lookingFor: form.lookingFor,
      capturedAt: new Date().toISOString(),
    };

    saveLeadProfile(profile);

    const context = detectPageContext({ propertyName: projectName, projectName });
    sendLeadToSheet({
      profile,
      context,
      leadSource: `Brochure Gate Download (${projectName})`,
    });

    setSubmitting(false);
    setUnlocked(true);

    if (brochureUrl) {
      setTimeout(() => {
        window.open(brochureUrl, "_blank");
      }, 500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#090D16] text-white border border-amber-500/30 p-6 pt-10 gap-3 [&>button]:hidden shadow-2xl rounded-2xl">
        <DialogClose
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 focus:outline-none transition-colors border border-amber-500/30"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </DialogClose>

        <DialogHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
            {unlocked ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Lock className="w-6 h-6" />}
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-white">
            {unlocked ? "Brochure Unlocked!" : "Download Official Brochure"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-300 font-medium max-w-sm mx-auto">
            {unlocked
              ? `Your digital brochure for ${projectName} is ready for download.`
              : `Enter your details to instant access floor plans, master plan and pricing brochure for ${projectName}.`}
          </DialogDescription>
        </DialogHeader>

        {unlocked ? (
          <div className="space-y-4 pt-2 text-center">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold leading-relaxed">
              ✅ Success! Your download will start automatically. If it doesn't start, tap the button below.
            </div>
            {brochureUrl && (
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold rounded-xl shadow-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-all text-base"
              >
                <Download size={20} /> Download PDF Brochure
              </a>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            {error && <p className="text-xs text-rose-400 text-center font-bold bg-rose-500/10 p-2 rounded-lg border border-rose-500/30">{error}</p>}
            
            <div className="space-y-1">
              <Label htmlFor="bg-name" className="text-xs font-bold text-amber-400">Full Name *</Label>
              <Input
                id="bg-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter your name"
                className="bg-slate-900 border-amber-500/30 text-white font-medium h-10"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="bg-phone" className="text-xs font-bold text-amber-400">Mobile Number *</Label>
              <Input
                id="bg-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="+91 10-digit mobile"
                className="bg-slate-900 border-amber-500/30 text-white font-medium h-10"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="bg-email" className="text-xs font-bold text-amber-400">Email Address</Label>
              <Input
                id="bg-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className="bg-slate-900 border-amber-500/30 text-white font-medium h-10"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-amber-400">Looking For</Label>
              <Select value={form.lookingFor} onValueChange={(v) => setForm({ ...form, lookingFor: v as LookingFor })}>
                <SelectTrigger className="bg-slate-900 border-amber-500/30 text-white font-medium h-10">
                  <SelectValue placeholder="Select BHK" />
                </SelectTrigger>
                <SelectContent className="bg-[#0B101D] border-amber-500/30 text-white">
                  {LOOKING_FOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold shadow-lg rounded-xl text-base transition-all mt-2"
            >
              {submitting ? "Verifying..." : "Unlock & Download Brochure"}
            </Button>

            <p className="text-[10px] text-center text-slate-400 font-medium flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" /> Complete privacy. Zero spam. Direct from Naani Projects.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BrochureGateModal;
