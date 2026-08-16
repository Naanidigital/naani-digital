import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, MessageCircle, X } from "lucide-react";
import {
  LeadProfile,
  LookingFor,
  saveLeadProfile,
  sendLeadToSheet,
  PageContext,
  LOOKING_FOR_OPTIONS,
} from "@/lib/leadProfile";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: PageContext;
  leadSource: string;
  onCaptured: (profile: LeadProfile) => void;
}

const LeadQualificationPopup = ({
  open,
  onOpenChange,
  context,
  leadSource,
  onCaptured,
}: Props) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    lookingFor: "" as LookingFor | "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setErrors({});
  }, [open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    else if (form.name.trim().length > 100) e.name = "Name too long";
    if (!form.phone.trim()) e.phone = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      e.phone = "Enter a valid 10-digit mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email";
    if (!form.lookingFor) e.lookingFor = "Select what you're looking for";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    const profile: LeadProfile = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      lookingFor: form.lookingFor as LookingFor,
      capturedAt: new Date().toISOString(),
    };
    saveLeadProfile(profile);
    await sendLeadToSheet({ profile, context, leadSource });
    setSubmitting(false);
    onOpenChange(false);
    onCaptured(profile);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#090D16] text-white border border-amber-500/30 p-5 sm:p-6 pt-12 gap-2 [&>button]:hidden shadow-2xl rounded-2xl">
        {/* Large, high-contrast close button */}
        <DialogClose
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors border border-amber-500/30"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </DialogClose>

        <DialogHeader className="pr-10 space-y-1">
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-center text-white">
            Get Property Details
          </DialogTitle>
          {context.propertyName ? (
            <DialogDescription className="text-center text-xs text-slate-300 font-medium">
              Enquiry for:{" "}
              <span className="font-extrabold text-amber-400">
                {context.propertyName}
              </span>
            </DialogDescription>
          ) : (
            <DialogDescription className="text-center text-xs text-slate-300 font-medium">
              Share your details and our Hyderabad expert will reach out.
            </DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="space-y-1">
            <Label htmlFor="lq-name" className="text-xs font-bold text-amber-400">Full Name *</Label>
            <Input
              id="lq-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className={`h-10 bg-slate-900 border-amber-500/30 text-white font-medium ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lq-phone" className="text-xs font-bold text-amber-400">Mobile Number *</Label>
            <Input
              id="lq-phone"
              inputMode="numeric"
              placeholder="10-digit mobile"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
              className={`h-10 bg-slate-900 border-amber-500/30 text-white font-medium ${errors.phone ? "border-destructive" : ""}`}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lq-email" className="text-xs font-bold text-amber-400">Email Address</Label>
            <Input
              id="lq-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={120}
              className={`h-10 bg-slate-900 border-amber-500/30 text-white font-medium ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-amber-400">Looking For *</Label>
            <Select
              value={form.lookingFor}
              onValueChange={(v) =>
                setForm({ ...form, lookingFor: v as LookingFor })
              }
            >
              <SelectTrigger className={`h-10 bg-slate-900 border-amber-500/30 text-white font-medium ${errors.lookingFor ? "border-destructive" : ""}`}>
                <SelectValue placeholder="Select configuration" />
              </SelectTrigger>
              <SelectContent className="bg-[#0B101D] border-amber-500/30 text-white">
                <SelectItem value="2 BHK">2 BHK Apartment</SelectItem>
                <SelectItem value="3 BHK">3 BHK Apartment</SelectItem>
                <SelectItem value="4 BHK">4 BHK Apartment / Villa</SelectItem>
                <SelectItem value="Plot">Residential Plot</SelectItem>
                <SelectItem value="Other">Other Property</SelectItem>
              </SelectContent>
            </Select>
            {errors.lookingFor && (
              <p className="text-xs text-destructive">{errors.lookingFor}</p>
            )}
          </div>


          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold shadow-lg rounded-xl text-base transition-all mt-2"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Submit & Request Callback"
            )}
          </Button>

          <p className="text-[10px] text-center text-slate-400 font-medium">
            🔒 Your data is safe. We never spam or sell information.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadQualificationPopup;
