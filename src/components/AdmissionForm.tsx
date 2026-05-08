import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Users, 
  GraduationCap, 
  MapPin, 
  ClipboardCheck, 
  Camera,
  Contact,
  CreditCard,
  Briefcase,
  Printer
} from 'lucide-react';

const STEPS = [
  { id: 'student', title: 'Student Identity', icon: <User className="w-4 h-4" /> },
  { id: 'contact', title: 'Contact Details', icon: <Contact className="w-4 h-4" /> },
  { id: 'parent', title: 'Family Info', icon: <Users className="w-4 h-4" /> },
  { id: 'academic', title: 'Class & Location', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'review', title: 'Review', icon: <ClipboardCheck className="w-4 h-4" /> },
];

interface AdmissionFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export function AdmissionForm({ onSuccess, compact = false }: AdmissionFormProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    dateOfBirth: '',
    age: 0,
    gender: '',
    bloodGroup: '',
    aadhaarNumber: '',
    photoUrl: '', 
    
    mobileNumber: '',
    alternateMobileNumber: '',
    email: '',
    
    village: '',
    district: '',
    state: '',
    pincode: '',
    
    fatherName: '',
    motherName: '',
    guardianName: '',
    parentMobile: '',
    parentOccupation: '',
    annualIncome: '',
  });

  // Auto-calculate age
  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, age: Math.max(0, age) }));
    }
  }, [formData.dateOfBirth]);

  const nextStep = () => {
    if (currentStep === 0 && (!formData.studentName || !formData.dateOfBirth || !formData.aadhaarNumber)) {
        toast.error("Please fill all mandatory identity fields");
        return;
    }
    if (currentStep === 1 && !formData.mobileNumber) {
        toast.error("Mobile number is mandatory");
        return;
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Check for unique mobile number
      const q = query(collection(db, 'applications'), where('mobileNumber', '==', formData.mobileNumber));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        toast.error("An application with this mobile number already exists.");
        setLoading(false);
        return;
      }

      const docRef = await addDoc(collection(db, 'applications'), {
        ...formData,
        parentId: user.uid,
        parentEmail: user.email,
        status: 'pending',
        submittedAt: serverTimestamp(),
        admissionDate: serverTimestamp(), 
      });
      
      setApplicationId(docRef.id);
      setSubmitted(true);
      toast.success("Application File Generated.");
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'applications');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center p-12 space-y-10"
      >
        <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] relative group">
          <div className="absolute inset-0 bg-emerald-500 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity animate-pulse" />
          <CheckCircle2 className="w-12 h-12 relative z-10" strokeWidth={2.5} />
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl font-display font-bold tracking-tight text-slate-900 uppercase">Application Filed</h2>
          <p className="text-slate-500 font-medium text-base max-w-md mx-auto">Your credentials have been successfully logged in our central registry. We will contact you shortly.</p>
        </div>
        <div className="bg-slate-50 px-10 py-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-3">Tracking Reference</span>
            <p className="text-4xl font-display font-bold tracking-tight text-slate-900">{applicationId.toUpperCase()}</p>
        </div>
        <div className="flex gap-4 no-print">
          <Button 
            onClick={() => window.print()} 
            variant="outline" 
            className="rounded-xl h-14 px-10 font-bold uppercase text-[11px] tracking-widest border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Confirmation
          </Button>
          {!compact && (
            <Button onClick={() => window.location.reload()} className="rounded-xl h-14 px-10 font-bold uppercase text-[11px] tracking-widest bg-slate-900 text-white shadow-xl shadow-slate-900/20 active:scale-95 transition-all">
              Return to Portal
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-white transition-all duration-700 ${compact ? '' : 'w-full max-w-[1400px] mx-auto lg:py-8 lg:px-8'}`}>
      {/* Stepper Header */}
      <div className={`shrink-0 border-b border-slate-100 no-print ${compact ? 'px-8 py-6' : 'px-10 py-10'}`}>
        <div className="flex justify-between items-center overflow-x-auto scrollbar-hide pb-4 max-w-5xl mx-auto">
           {STEPS.map((step, i) => (
             <div key={step.id} className="flex flex-col items-center gap-4 relative flex-1 min-w-[120px]">
                <div 
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 z-10 text-xs border-2 ${
                    i <= currentStep 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]' 
                        : 'bg-white text-slate-300 border-slate-100'
                  }`}
                >
                  {i < currentStep ? <CheckCircle2 className="w-5 h-5" strokeWidth={3} /> : step.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 text-center ${
                  i <= currentStep ? 'text-slate-900' : 'text-slate-300'
                }`}>
                  {step.title}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`absolute top-5.5 left-[50%] w-full h-[2px] -z-0 transition-colors duration-500 ${
                    i < currentStep ? 'bg-slate-900' : 'bg-slate-100'
                  }`} />
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center">
        <div className={`w-full p-8 lg:p-16 space-y-16 transition-all duration-500 ${compact ? '' : 'max-w-5xl'}`}>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-slate-200 text-slate-400 rounded-full text-[10px] font-bold tracking-widest px-3 h-6 uppercase">Step {currentStep + 1} of {STEPS.length}</Badge>
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Skyline Admission Registry</span>
                </div>
                <h3 className="text-5xl md:text-6xl font-display font-bold tracking-tight uppercase text-slate-900 leading-none">
                  {STEPS[currentStep].title}
                </h3>
              </div>
              <div className="flex items-center gap-4 no-print shrink-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => window.print()}
                  className="rounded-xl h-14 w-14 border border-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <Printer className="w-5 h-5" />
                </Button>
                <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10">
                    Admission Form 2025
                </div>
              </div>
           </div>
        
           <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="col-span-full flex items-center gap-8 mb-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <div className="w-28 h-28 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group hover:border-slate-900 transition-all cursor-pointer overflow-hidden relative shadow-sm">
                      {formData.photoUrl ? (
                         <img src={formData.photoUrl} className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-7 h-7" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="space-y-3 flex-1">
                       <h4 className="font-bold text-[11px] uppercase tracking-[0.3em] text-slate-900">Official Portrait</h4>
                       <Input 
                          placeholder="Public image URL / CDN storage link" 
                          className="h-12 text-sm rounded-xl border-slate-200 bg-white placeholder:text-slate-300 font-medium"
                          value={formData.photoUrl}
                          onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                       />
                       <p className="text-[10px] text-slate-400 font-medium tracking-wide">High resolution, neutral background preferred.</p>
                    </div>
                  </div>

                  <div className="space-y-3 col-span-full">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Full Identity Name</Label>
                    <Input 
                      placeholder="As registered in national identity records" 
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="h-16 rounded-2xl border-slate-200 focus-visible:ring-slate-900/5 text-xl font-bold bg-white px-6 placeholder:text-slate-300 shadow-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Date of Birth</Label>
                    <Input 
                      type="date" 
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Chronological Age</Label>
                    <div className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center px-6 font-bold text-slate-900 text-lg">
                      {formData.age} <span className="text-slate-400 text-sm ml-2 font-medium tracking-wide">YEARS COMPLETED</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">National Identity Ref</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <Input 
                        placeholder="Aadhaar 12-digit UID" 
                        maxLength={12}
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, '') })}
                        className="h-14 rounded-2xl border-slate-200 bg-white pl-16 pr-6 font-bold shadow-sm tracking-[0.2em]"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Gender Identification</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, gender: v })} value={formData.gender}>
                      <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm">
                        <SelectValue placeholder="Select Identity" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl shadow-2xl p-2">
                        <SelectItem value="male" className="rounded-xl h-11">Male</SelectItem>
                        <SelectItem value="female" className="rounded-xl h-11">Female</SelectItem>
                        <SelectItem value="other" className="rounded-xl h-11">Other / Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Blood Registry (Optional)</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, bloodGroup: v })} value={formData.bloodGroup}>
                      <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm">
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl shadow-2xl p-2">
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                          <SelectItem key={b} value={b} className="rounded-xl h-11 font-bold">{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3 col-span-full">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Primary Communications Hook</Label>
                    <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xl">+91</span>
                        <Input 
                        placeholder="00000 00000" 
                        maxLength={10}
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                        className="h-16 rounded-2xl border-slate-200 bg-white pl-16 pr-6 text-2xl font-display font-bold shadow-sm tracking-widest"
                        />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Secondary Contact</Label>
                    <Input 
                      placeholder="+91 Alternate Line" 
                      value={formData.alternateMobileNumber}
                      onChange={(e) => setFormData({ ...formData, alternateMobileNumber: e.target.value })}
                      className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Electronic Mail Registry</Label>
                    <Input 
                      type="email" 
                      placeholder="student@domain.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm"
                    />
                  </div>

                  <div className="col-span-full mt-6 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-slate-900" />
                      </div>
                      <div>
                        <h4 className="text-xl font-display font-bold tracking-tight text-slate-900 uppercase">Geographical Residency</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Official physical address for logistics</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                      <div className="space-y-3">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Village / Town</Label>
                        <Input value={formData.village} onChange={(e) => setFormData({ ...formData, village: e.target.value })} className="h-14 rounded-2xl border-slate-100 bg-white px-6 font-bold" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Administrative District</Label>
                        <Input value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className="h-14 rounded-2xl border-slate-100 bg-white px-6 font-bold" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">State / Province</Label>
                        <Input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="h-14 rounded-2xl border-slate-100 bg-white px-6 font-bold" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Logistics Pin Code</Label>
                        <Input value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="h-14 rounded-2xl border-slate-100 bg-white px-6 font-bold shadow-sm tracking-[0.5em]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Guardian / Paternal Name</Label>
                    <Input value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Guardian / Maternal Name</Label>
                    <Input value={formData.motherName} onChange={(e) => setFormData({ ...formData, motherName: e.target.value })} className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Alternative Guardian (Legal)</Label>
                    <Input value={formData.guardianName} onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })} className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Direct Parental Line</Label>
                    <Input value={formData.parentMobile} onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })} className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm" />
                  </div>
                  
                  <div className="h-px bg-slate-100 col-span-full my-6" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Guardian Business Profile</Label>
                    </div>
                    <Input value={formData.parentOccupation} onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })} className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Economic bracket Index</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, annualIncome: v })} value={formData.annualIncome}>
                      <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-white px-6 font-bold shadow-sm">
                        <SelectValue placeholder="Select Annual bracket" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl shadow-2xl p-2 text-sm">
                        <SelectItem value="Below 2L" className="rounded-xl h-11">Tier III (Below ₹2 Lakh)</SelectItem>
                        <SelectItem value="2L - 5L" className="rounded-xl h-11">Tier II (₹2 Lakh - ₹5 Lakh)</SelectItem>
                        <SelectItem value="5L - 10L" className="rounded-xl h-11">Tier I (₹5 Lakh - ₹10 Lakh)</SelectItem>
                        <SelectItem value="Above 10L" className="rounded-xl h-11">Elite bracket (Above ₹10 Lakh)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-12">
                   <div className="p-12 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)]">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#3b82f6_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#6366f1_0%,transparent_50%)]" />
                      <div className="relative z-10 space-y-8">
                        <div className="space-y-2 text-center max-w-sm mx-auto">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Tier Classification</Label>
                          <h4 className="text-3xl font-display font-bold uppercase tracking-tight leading-none">Primary Academic Induction</h4>
                        </div>
                        <Select onValueChange={(v) => setFormData({ ...formData, grade: v })} value={formData.grade}>
                          <SelectTrigger className="h-20 rounded-[1.5rem] bg-white/5 border-white/10 text-2xl font-display font-bold uppercase tracking-tight text-center px-8 shadow-inner hover:bg-white/10 transition-all border-2">
                            <SelectValue placeholder="CHOOSE ACADEMIC LEVEL" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 text-white border-white/10 rounded-2xl shadow-2xl p-2">
                            {['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 11'].map(g => (
                              <SelectItem key={g} value={g} className="rounded-xl h-12 text-lg font-bold hover:bg-white/10">{g}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                   </div>

                   <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                      <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                         <ClipboardCheck className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h5 className="font-bold uppercase tracking-[0.3em] text-[10px] text-slate-400 mb-1">Time of Induction Registration</h5>
                        <p className="text-xl font-display font-bold text-slate-900">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-10">
                  <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 space-y-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/20 blur-3xl rounded-full -mr-20 -mt-20" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                      <div className="space-y-8">
                        <div className="flex items-center gap-6">
                           <div className="w-24 h-24 rounded-[1.5rem] bg-white border-4 border-white shadow-xl overflow-hidden ring-1 ring-slate-100">
                              {formData.photoUrl && <img src={formData.photoUrl} className="w-full h-full object-cover" />}
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Candidate Name</p>
                              <h4 className="text-4xl font-display font-bold tracking-tight uppercase text-slate-900 leading-tight">
                                {formData.studentName || 'Not Defined'}
                              </h4>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                           <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Identity (UID)</p>
                              <p className="font-bold text-lg text-slate-900 tracking-widest">{formData.aadhaarNumber || '---'}</p>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Attributes</p>
                              <p className="font-bold text-lg text-slate-900 uppercase tracking-tight">{formData.age} Y / {formData.gender || '---'}</p>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-10">
                         <div className="space-y-3">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Primary Contact Line</p>
                            <p className="text-3xl font-display font-bold tracking-tight text-slate-900">{formData.mobileNumber || '---'}</p>
                            <p className="text-sm font-medium text-slate-500 bg-white border border-slate-100 rounded-full px-4 py-1.5 inline-block shadow-sm">{formData.email || 'No electronic mail provided'}</p>
                         </div>
                         <div className="p-8 bg-white/60 rounded-[2rem] border border-slate-100 text-slate-600 text-sm font-medium leading-relaxed shadow-sm">
                            {formData.village}, {formData.district}, {formData.state} — {formData.pincode}
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-slate-50 rounded-[2rem] flex gap-8 items-center border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                     <div className="w-16 h-16 bg-slate-900 rounded-2xl shrink-0 flex items-center justify-center font-bold text-white shadow-xl shadow-slate-900/20 group-hover:scale-110 transition-transform">!</div>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        <span className="font-bold text-slate-900 uppercase tracking-widest block mb-1">Declaration Protocol</span>
                        By finalizing this audit, you verify that all supplied data nodes (Identity, Residency, and Family) are architecturally correct. Tampered data will trigger immediate systemic revocation.
                     </p>
                  </div>
                </div>
              )}
            </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className={`shrink-0 flex justify-between gap-6 p-8 border-t border-slate-50 bg-white no-print ${compact ? '' : 'rounded-b-[2.5rem]'}`}>
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={currentStep === 0 || loading}
            className="rounded-xl h-16 px-10 flex items-center gap-3 font-bold uppercase text-[11px] tracking-widest text-slate-400 hover:text-slate-900 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Go Back
          </Button>
          
          <div className="flex gap-4">
             {currentStep === STEPS.length - 1 ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading || !formData.studentName}
                  className="rounded-xl h-16 px-12 bg-slate-900 text-white flex items-center gap-4 active:scale-95 transition-all shadow-2xl shadow-slate-900/20"
                >
                  <span className="font-bold uppercase text-[11px] tracking-widest leading-none">{loading ? 'Processing Registry...' : 'Audit & Commit File'}</span>
                  <Send className="w-4 h-4" />
                </Button>
             ) : (
                <Button 
                  onClick={nextStep} 
                  className="rounded-xl h-16 px-12 bg-slate-900 text-white flex items-center gap-4 active:scale-95 transition-all shadow-2xl shadow-slate-900/20"
                >
                  <span className="font-bold uppercase text-[11px] tracking-widest leading-none">Proceed to Component</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
             )}
          </div>
      </div>
    </div>
  );
}
