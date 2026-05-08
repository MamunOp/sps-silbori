import React, { useEffect, useState } from 'react';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  addDoc, 
  serverTimestamp
} from 'firebase/firestore';
import { Application } from '../types';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AdmissionForm } from './AdmissionForm';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { 
    Check, 
    X, 
    Eye, 
    Plus, 
    Search, 
    Loader2,
    User,
    Printer,
    FileSpreadsheet,
    Filter
} from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

export function AdminDashboard({ view = 'applications' }: { view?: string }) {
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, 'applications');
    const q = query(colRef, orderBy('submittedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Application[];
      setData(items);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'applications');
    });

    return unsubscribe;
  }, []);

  const filteredData = data.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToExcel = () => {
    const exportData = filteredData.map(app => ({
      'Application ID': app.id.toUpperCase(),
      'Student Name': app.studentName,
      'Grade': app.grade,
      'Status': app.status.toUpperCase(),
      'Submission Date': app.submittedAt ? format(app.submittedAt.toDate(), 'yyyy-MM-dd HH:mm') : 'N/A',
      'Father Name': app.fatherName,
      'Mother Name': app.motherName,
      'Mobile': app.mobileNumber,
      'Aadhaar': app.aadhaarNumber,
      'Email': app.email || 'N/A',
      'Village': app.village,
      'District': app.district
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admissions");
    XLSX.writeFile(wb, `Skyline_Admissions_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    toast.success('Excel file exported successfully');
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 py-4 px-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="rounded-full border-blue-100 bg-blue-50/50 text-blue-700 text-[10px] font-bold px-2 py-0">ADMIN PORTAL</Badge>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-mono font-medium text-slate-400 tracking-wider">VERSION 2.4.0</span>
                </div>
                <h2 className="text-5xl font-display font-bold tracking-tight text-slate-900 leading-[0.9]">Registry Ledger</h2>
                <p className="text-slate-500 font-medium tracking-tight mt-2 max-w-lg">Advanced student admission management system and official record keeping.</p>
            </div>
            <div className="flex items-center gap-3 no-print">
                <Button 
                    variant="outline" 
                    onClick={exportToExcel}
                    className="rounded-2xl h-12 px-6 border-slate-200 font-bold uppercase text-[11px] tracking-widest hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all flex items-center gap-2 bg-white"
                >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    Export Sheet
                </Button>
                <Button 
                    variant="outline" 
                    onClick={() => window.print()}
                    className="rounded-2xl h-12 px-6 border-slate-200 font-bold uppercase text-[11px] tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 bg-white"
                >
                    <Printer className="w-4 h-4 text-slate-600" />
                    Print PDF
                </Button>
                <NewAdmissionDialog />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 no-print items-center">
            <div className="relative md:col-span-6 lg:col-span-7">
                <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                <Input 
                    placeholder="Filter records by name, ID, or reference number..." 
                    className="pl-12 h-14 bg-white border-slate-200 rounded-[1.25rem] shadow-sm focus:ring-slate-900 focus:border-slate-900 text-base" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="relative md:col-span-3 lg:col-span-3">
                <Filter className="absolute left-4 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-[1.25rem] shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-slate-900/5 text-sm font-semibold text-slate-700"
                >
                    <option value="all">Display All Records</option>
                    <option value="pending">Status: Pending Verification</option>
                    <option value="reviewed">Status: Under Review</option>
                    <option value="accepted">Status: Enrollment Accepted</option>
                    <option value="rejected">Status: Registry Declined</option>
                </select>
            </div>
            <div className="md:col-span-3 lg:col-span-2 h-14 flex items-center justify-between bg-slate-900 rounded-[1.25rem] px-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-display">Active Records</span>
                <span className="text-xl font-bold font-display">{filteredData.length}</span>
            </div>
        </div>

        <Card className="border border-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden bg-white print-shadow-none print-border-none">
            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-slate-100 hover:bg-transparent">
                        <TableHead className="font-display uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400 h-16 px-8">Tracking UUID</TableHead>
                        <TableHead className="font-display uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400 h-16">Enrollment Profile</TableHead>
                        <TableHead className="font-display uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400 h-16">Grade</TableHead>
                        <TableHead className="font-display uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400 h-16">Entry Date</TableHead>
                        <TableHead className="font-display uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400 h-16">Current Phase</TableHead>
                        <TableHead className="text-right font-display uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400 h-16 px-8 no-print">Control</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-96 text-center">
                                <Loader2 className="w-12 h-12 animate-spin mx-auto text-slate-200" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-6">Synchronizing Data Streams...</p>
                            </TableCell>
                        </TableRow>
                    ) : filteredData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-96 text-center">
                                <div className="max-w-xs mx-auto space-y-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                      <Search className="w-6 h-6 text-slate-200" />
                                    </div>
                                    <div className="space-y-1">
                                      <h4 className="text-xl font-bold text-slate-900 tracking-tight">Vault Empty</h4>
                                      <p className="text-sm text-slate-500 font-medium">No records match your current filtering criteria or the database is unpopulated.</p>
                                    </div>
                                    <Button variant="outline" className="rounded-xl h-10 px-6 border-slate-200 font-bold uppercase text-[10px] tracking-widest mt-4">Reset Parameters</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredData.map((app) => (
                            <TableRow key={app.id} className="group hover:bg-slate-50/50 border-slate-50 transition-all h-24">
                                <TableCell className="px-8">
                                    <code className="bg-slate-50 text-[11px] font-bold text-slate-400 p-2 rounded-lg border border-slate-100 group-hover:text-slate-900 transition-colors">
                                        {app.id.slice(0, 12).toUpperCase()}
                                    </code>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-105 transition-transform overflow-hidden shadow-sm">
                                            {app.photoUrl ? <img src={app.photoUrl} className="w-full h-full object-cover" /> : <User className="w-6 h-6 text-slate-300" />}
                                        </div>
                                        <div className="flex flex-col space-y-0.5">
                                            <span className="font-bold text-base text-slate-900 tracking-tight">{app.studentName}</span>
                                            <div className="flex items-center gap-2">
                                              <span className="text-[10px] text-slate-400 font-bold font-mono tracking-tighter">{app.parentMobile}</span>
                                              <div className="w-1 h-1 rounded-full bg-slate-200" />
                                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{app.village}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                                      <span className="text-sm font-bold text-slate-700">Class {app.grade}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-slate-500 font-medium">
                                    {app.submittedAt ? format(app.submittedAt.toDate(), 'dd MMM, yyyy') : '--'}
                                </TableCell>
                                <TableCell>
                                    {renderStatusBadge(app.status)}
                                </TableCell>
                                <TableCell className="text-right px-8 no-print">
                                    <div className="flex items-center justify-end gap-2">
                                        <ApplicationView app={app} />
                                        <div className="h-8 w-[1px] bg-slate-100 mx-1" />
                                        <Button size="icon" variant="ghost" className="h-10 w-10 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors border border-transparent hover:border-emerald-100" onClick={() => handleStatusUpdate(app.id, 'accepted')}>
                                            <Check className="h-5 w-5" strokeWidth={2.5} />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-10 w-10 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors border border-transparent hover:border-rose-100" onClick={() => handleStatusUpdate(app.id, 'rejected')}>
                                            <X className="h-5 w-5" strokeWidth={2.5} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    </div>
  );

  async function handleStatusUpdate(id: string, status: string) {
    try {
        await updateDoc(doc(db, 'applications', id), { status });
        toast.promise(Promise.resolve(), {
            loading: 'Updating status...',
            success: `Registry updated to ${status.toUpperCase()}`,
            error: 'Failed to update ledger'
        });
    } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, 'applications');
    }
  }
}

function renderStatusBadge(status: string) {
    const configs = {
        pending: 'bg-amber-50 text-amber-700 border-amber-100',
        reviewed: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        accepted: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        rejected: 'bg-rose-50 text-rose-700 border-rose-100'
    };

    return (
        <Badge className={`${configs[status as keyof typeof configs]} font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-[0.5rem] border shadow-none`}>
            {status}
        </Badge>
    );
}

function ApplicationView({ app }: { app: Application }) {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                    <Eye className="h-5 w-5" strokeWidth={2} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden rounded-[2.5rem] bg-white">
                <div className="h-40 bg-slate-900 px-12 flex items-center justify-between no-print relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,#3b82f6_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#6366f1_0%,transparent_50%)]" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline" className="border-white/20 text-white/60 rounded-full text-[10px] font-bold tracking-widest px-2">DOSSIER VIEW</Badge>
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[10px] font-mono font-medium text-white/40 tracking-wider">SECURE ACCESS</span>
                        </div>
                        <h2 className="text-white text-4xl font-display font-bold tracking-tight leading-none uppercase">Profile Insight</h2>
                    </div>
                    <div className="flex gap-3 relative z-10">
                        <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl h-12 px-6 border border-white/10 text-[11px] font-bold uppercase tracking-widest transition-all" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print Sheet
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl w-12 h-12 bg-white/5">
                            <X className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
                
                <div className="p-12 space-y-12 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <div className="flex gap-12 items-start">
                        <div className="w-56 h-56 bg-slate-50 rounded-[2rem] overflow-hidden border-[8px] border-white shadow-2xl relative group shrink-0 ring-1 ring-slate-100">
                            {app.photoUrl ? (
                                <img src={app.photoUrl} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-200 bg-slate-50">
                                    <User className="w-20 h-20" strokeWidth={1} />
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 py-2 bg-slate-900/90 text-white text-[9px] font-bold text-center uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Identity Verified
                            </div>
                        </div>
                        
                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2 block">Candidate Identity</span>
                                    <h3 className="text-6xl font-display font-bold tracking-tighter text-slate-900 leading-[0.9]">{app.studentName}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-slate-900 hover:bg-slate-800 text-white border-none rounded-xl px-5 h-8 text-[11px] font-bold uppercase tracking-widest transition-colors">Class {app.grade}</Badge>
                                    <div className="h-4 w-[1px] bg-slate-200" />
                                    <Badge variant="outline" className="border-slate-200 text-slate-500 rounded-xl px-5 h-8 text-[11px] font-bold uppercase tracking-widest bg-white shadow-sm font-mono">{app.id.toUpperCase()}</Badge>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-4">
                                <DetailItem label="Official Date of Birth" value={app.dateOfBirth} />
                                <DetailItem label="National ID / Aadhaar" value={app.aadhaarNumber} />
                                <DetailItem label="Primary Guardian / Father" value={app.fatherName} />
                                <DetailItem label="Secondary Guardian / Mother" value={app.motherName} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        <InfoCard label="Contact Channel" value={app.mobileNumber} secondary={app.email || 'No electronic mail registered'} />
                        <InfoCard label="Physical Residency" value={`${app.village}, ${app.district}`} secondary={`${app.state} Region — ${app.pincode}`} />
                        <InfoCard label="Emergency Protocol" value={app.parentMobile} secondary="Priority Communications Authorized" />
                    </div>

                    <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 space-y-8">
                         <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Governance & Compliance</h4>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Manual Audit</span>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-12">
                            <ul className="space-y-4">
                                <ComplianceRow label="Digital Identity Certificate verified" checked={true} />
                                <ComplianceRow label="Residence Affirmation submitted" checked={true} />
                                <ComplianceRow label="Previous Academic Credentials" checked={true} />
                                <ComplianceRow label="Medical Clearance Documentation" checked={false} />
                            </ul>
                            <div className="bg-white p-8 rounded-[1.5rem] border border-slate-200/50 shadow-xl shadow-slate-200/20 flex flex-col justify-between space-y-6">
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    This application is designated to the <span className="font-bold text-slate-900 uppercase">{app.status}</span> registry stack. Cross-reference all biometric data during the physical induction phase.
                                </p>
                                <div className="flex gap-4">
                                    <Button className="flex-1 bg-slate-900 hover:bg-slate-800 rounded-xl h-14 text-[12px] font-bold uppercase tracking-widest shadow-xl shadow-slate-900/20 transition-all active:scale-95">Induct Student</Button>
                                    <Button variant="outline" className="flex-1 rounded-xl h-14 text-[12px] font-bold uppercase tracking-widest border-slate-200 text-slate-500 hover:bg-slate-50">Revoke access</Button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 underline decoration-slate-200 underline-offset-4">{label}</span>
            <p className="font-bold text-lg text-slate-900 tracking-tight">{value}</p>
        </div>
    );
}

function InfoCard({ label, value, secondary }: { label: string, value: string, secondary: string }) {
    return (
        <div className="p-8 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-5 group-hover:text-blue-600 transition-colors">{label}</span>
            <p className="font-bold text-xl text-slate-900 mb-2 tracking-tight leading-tight">{value}</p>
            <p className="text-[11px] font-medium text-slate-400 truncate tracking-tight">{secondary}</p>
        </div>
    );
}

function ComplianceRow({ label, checked }: { label: string, checked: boolean }) {
    return (
        <li className="flex items-center gap-3 text-sm font-medium text-blue-950">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${checked ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-400'}`}>
                {checked ? <Check className="w-3 h-3" strokeWidth={4} /> : <X className="w-3 h-3" />}
            </div>
            {label}
        </li>
    );
}

function NewAdmissionDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="bg-blue-950 h-11 px-6 rounded-xl flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95 no-print">
                    <Plus className="w-4 h-4" />
                    Registry Entry
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-none w-screen h-screen p-0 border-none shadow-none rounded-none overflow-hidden flex flex-col bg-white">
                <div className="shrink-0 h-16 bg-blue-950 px-10 flex items-center justify-between no-print">
                    <div>
                        <h2 className="text-white text-xl font-black tracking-tighter uppercase italic leading-none">Admission Registry</h2>
                        <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest mt-1">Official Entry Protocol</p>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setOpen(false)}
                        className="text-white/50 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
                    >
                        <X className="w-5 h-5" strokeWidth={3} />
                    </Button>
                </div>
                <div className="flex-1 overflow-hidden print-p-0 print-m-0">
                    <AdmissionForm onSuccess={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
