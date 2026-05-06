import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
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
  Briefcase
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
        className="flex flex-col items-center text-center p-12 space-y-8"
      >
        <div className="w-20 h-20 bg-blue-950 text-white rounded-full flex items-center justify-center shadow-2xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic text-blue-950">Application Filed</h2>
          <p className="text-neutral-500 font-serif italic text-sm">Your credentials have been logged in our registry.</p>
        </div>
        <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100 flex flex-col items-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-2">Tracking Reference</span>
            <p className="text-2xl font-black tracking-tight text-blue-950">{applicationId.toUpperCase()}</p>
        </div>
        {!compact && (
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-neutral-200">
            Return to Portal
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-white transition-all duration-700 ${compact ? '' : 'w-full max-w-[1400px] mx-auto lg:py-8 lg:px-8'}`}>
      {/* Stepper Header */}
      <div className={`shrink-0 border-b border-neutral-100 ${compact ? 'px-8 py-6' : 'px-10 py-8'}`}>
        <div className="flex justify-between items-center overflow-x-auto scrollbar-hide pb-2 max-w-5xl mx-auto">
           {STEPS.map((step, i) => (
             <div key={step.id} className="flex flex-col items-center gap-3 relative flex-1 min-w-[100px]">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 z-10 text-xs ${
                    i <= currentStep ? 'bg-blue-950 text-white shadow-2xl shadow-blue-900/30' : 'bg-neutral-100 text-neutral-300'
                  }`}
                >
                  {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 text-center ${
                  i <= currentStep ? 'text-blue-950' : 'text-neutral-300'
                }`}>
                  {step.title}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`absolute top-4.5 left-[50%] w-full h-[1px] -z-0 transition-colors duration-500 ${
                    i < currentStep ? 'bg-blue-950' : 'bg-neutral-100'
                  }`} />
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center">
        <div className={`w-full p-8 lg:p-20 space-y-12 transition-all duration-500 ${compact ? '' : 'max-w-6xl'}`}>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-neutral-50 pb-8">
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-blue-950 leading-none">
                  {STEPS[currentStep].title}
                </h3>
                <p className="text-lg font-serif italic text-neutral-400">
                  Skyline Admission — Official Registry Entry Step {currentStep + 1}
                </p>
              </div>
              <div className="px-6 py-3 bg-orange-500 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-orange-500/40">
                Component {currentStep + 1} of {STEPS.length}
              </div>
           </div>
        
           <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="col-span-full flex items-center gap-6 mb-4">
                    <div className="w-20 h-20 bg-neutral-100 rounded-2xl border border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-300 group hover:border-blue-950 transition-colors cursor-pointer overflow-hidden relative">
                      {formData.photoUrl ? (
                         <img src={formData.photoUrl} className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                       <h4 className="font-black text-[10px] uppercase tracking-widest text-blue-950">Portrait Upload</h4>
                       <Input 
                          placeholder="Image public URL" 
                          className="h-9 text-[10px] rounded-xl border-neutral-200"
                          value={formData.photoUrl}
                          onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                       />
                    </div>
                  </div>

                  <div className="space-y-2 col-span-full">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Full Name (As per Aadhaar)</Label>
                    <Input 
                      placeholder="e.g. Rahul Boruah" 
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="h-14 rounded-2xl focus-visible:ring-neutral-200 text-lg font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Date of Birth</Label>
                    <Input 
                      type="date" 
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="h-10 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Age</Label>
                    <div className="h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center px-4 font-bold text-neutral-600 text-sm">
                      {formData.age} Years Old
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Aadhaar Number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                      <Input 
                        placeholder="XXXX XXXX XXXX" 
                        maxLength={12}
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, '') })}
                        className="h-12 rounded-xl pl-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Gender</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, gender: v })} value={formData.gender}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Blood Group (Optional)</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, bloodGroup: v })} value={formData.bloodGroup}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Unknown" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-2 col-span-full">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Primary Mobile Number (Unique)</Label>
                    <Input 
                      placeholder="10 digit number" 
                      maxLength={10}
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                      className="h-14 rounded-2xl text-xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Alternate Mobile Number</Label>
                    <Input 
                      placeholder="+91" 
                      value={formData.alternateMobileNumber}
                      onChange={(e) => setFormData({ ...formData, alternateMobileNumber: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Personal Email (Optional)</Label>
                    <Input 
                      type="email" 
                      placeholder="student@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="col-span-full mt-4">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <h4 className="font-black uppercase tracking-tighter text-blue-950">Permanent Address</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Village / Town</Label>
                        <Input value={formData.village} onChange={(e) => setFormData({ ...formData, village: e.target.value })} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">District</Label>
                        <Input value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">State</Label>
                        <Input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">PIN Code</Label>
                        <Input value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="h-12 rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Father's Full Name</Label>
                    <Input value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Mother's Full Name</Label>
                    <Input value={formData.motherName} onChange={(e) => setFormData({ ...formData, motherName: e.target.value })} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Guardian Name (Optional)</Label>
                    <Input value={formData.guardianName} onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Parent Mobile Number</Label>
                    <Input value={formData.parentMobile} onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })} className="h-12 rounded-xl" />
                  </div>
                  
                  <div className="h-px bg-neutral-100 col-span-full my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-3 h-3 text-neutral-400" />
                      <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Parent Occupation</Label>
                    </div>
                    <Input value={formData.parentOccupation} onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Annual Income (Optional)</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, annualIncome: v })} value={formData.annualIncome}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Below 2L">Below ₹2 Lakh</SelectItem>
                        <SelectItem value="2L - 5L">₹2 Lakh - ₹5 Lakh</SelectItem>
                        <SelectItem value="5L - 10L">₹5 Lakh - ₹10 Lakh</SelectItem>
                        <SelectItem value="Above 10L">Above ₹10 Lakh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                   <div className="p-8 bg-blue-950 text-white rounded-3xl relative overflow-hidden">
                      <div className="relative z-10 space-y-4">
                        <div className="space-y-1">
                          <Label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Enrollment Level</Label>
                          <h4 className="text-2xl font-black uppercase tracking-tighter italic">Primary Academic Class</h4>
                        </div>
                        <Select onValueChange={(v) => setFormData({ ...formData, grade: v })} value={formData.grade}>
                          <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 text-xl font-black uppercase tracking-tighter">
                            <SelectValue placeholder="CHOOSE LEVEL" />
                          </SelectTrigger>
                          <SelectContent className="bg-blue-950 text-white border-white/10">
                            {['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 11'].map(g => (
                              <SelectItem key={g} value={g}>{g}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                      <div className="w-10 h-10 bg-white border border-neutral-100 rounded-xl flex items-center justify-center text-neutral-300">
                         <ClipboardCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-black uppercase tracking-widest text-[8px] text-blue-950">Filing Date</h5>
                        <p className="text-sm font-bold text-neutral-600">{new Date().toLocaleDateString('en-GB')}</p>
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="bg-neutral-50 rounded-[2.5rem] p-10 border border-neutral-100 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-xl bg-neutral-200 overflow-hidden">
                              {formData.photoUrl && <img src={formData.photoUrl} className="w-full h-full object-cover" />}
                           </div>
                           <div>
                              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em]">Student Name</p>
                              <h4 className="text-2xl font-black tracking-tighter uppercase italic">{formData.studentName || 'Not Set'}</h4>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em]">Identity (Aadhaar)</p>
                              <p className="font-bold">{formData.aadhaarNumber || '---'}</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em]">Age / Gender</p>
                              <p className="font-bold uppercase">{formData.age} yrs / {formData.gender || '---'}</p>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                         <div>
                            <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em]">Main Contact</p>
                            <p className="text-xl font-black tracking-tight">{formData.mobileNumber || '---'}</p>
                            <p className="text-xs text-neutral-500">{formData.email || 'No email provided'}</p>
                         </div>
                         <div className="p-4 bg-white rounded-2xl border border-neutral-100 italic text-xs leading-relaxed">
                            {formData.village}, {formData.district}, {formData.state} - {formData.pincode}
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-blue-950 text-white rounded-3xl flex gap-6 items-center">
                     <div className="w-12 h-12 bg-white/10 rounded-full shrink-0 flex items-center justify-center font-black animate-pulse">!</div>
                     <p className="text-xs text-white/60 leading-relaxed font-medium">
                        By clicking submit, you verify that all details provided (including Aadhaar and Contact information) are correct. Incorrect information may lead to rejection.
                     </p>
                  </div>
                </div>
              )}
            </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className={`shrink-0 flex justify-between gap-4 p-8 border-t border-neutral-50 bg-white ${compact ? '' : 'rounded-b-[2.5rem]'}`}>
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={currentStep === 0 || loading}
            className="rounded-xl h-12 px-6 flex items-center gap-2 font-black uppercase text-[9px] tracking-widest"
          >
            <ChevronLeft className="w-3 h-3" />
            Previous
          </Button>
          
          <div className="flex gap-4">
             {currentStep === STEPS.length - 1 ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading || !formData.studentName}
                  className="rounded-xl h-12 px-10 bg-blue-950 text-white flex items-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-950/20"
                >
                  <span className="font-black uppercase text-[9px] tracking-widest">{loading ? 'Processing...' : 'Affirm & File'}</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>
             ) : (
                <Button 
                  onClick={nextStep} 
                  className="rounded-xl h-12 px-10 bg-blue-950 text-white flex items-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-950/20"
                >
                  <span className="font-black uppercase text-[9px] tracking-widest">Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
             )}
          </div>
      </div>
    </div>
  );
}
