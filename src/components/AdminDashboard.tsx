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
  serverTimestamp,
  getDocs,
  where,
  deleteDoc
} from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';
import { Application, Student, Invoice } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AdmissionForm } from './AdmissionForm';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { 
    Check, 
    X, 
    Eye, 
    Plus, 
    Search, 
    Filter,
    ArrowUpRight,
    Loader2,
    TrendingUp,
    TrendingDown,
    Activity,
    CreditCard as CardIcon,
    User
} from 'lucide-react';
import { format } from 'date-fns';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    AreaChart, 
    Area,
    BarChart,
    Bar
} from 'recharts';

const dummyAnalytics = [
    { name: 'Jan', students: 100, fees: 4000 },
    { name: 'Feb', students: 120, fees: 3000 },
    { name: 'Mar', students: 150, fees: 2000 },
    { name: 'Apr', students: 180, fees: 2780 },
    { name: 'May', students: 250, fees: 1890 },
    { name: 'Jun', students: 300, fees: 2390 },
];

export function AdminDashboard({ view }: { view: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (view === 'dashboard') {
        setLoading(false);
        return;
    }
    setLoading(true);
    const colRef = collection(db, view);
    const q = query(colRef, orderBy(view === 'applications' ? 'submittedAt' : 'createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, view);
    });

    return unsubscribe;
  }, [view]);

  const filteredData = data.filter(item => {
    const searchStr = searchTerm.toLowerCase();
    if (view === 'applications') return item.studentName.toLowerCase().includes(searchStr);
    if (view === 'students') return item.name.toLowerCase().includes(searchStr);
    if (view === 'fees') return item.studentId.toLowerCase().includes(searchStr) || item.description.toLowerCase().includes(searchStr);
    return true;
  });

  return (
    <div className="space-y-6">
      {view === 'dashboard' ? (
          <AnalyticsDashboard />
      ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h2 className="text-2xl font-bold tracking-tight capitalize">{view}</h2>
                <p className="text-sm text-neutral-500">Manage all {view} in the system.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
                        <Input 
                            placeholder={`Search ${view}...`} 
                            className="pl-9 bg-white" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {view === 'fees' && <CreateInvoiceDialog />}
                    {view === 'students' && <AddStudentDialog />}
                    {view === 'applications' && <NewAdmissionDialog />}
                </div>
            </div>

            <Card className="border-neutral-200 overflow-hidden shadow-sm">
                <Table>
                <TableHeader className="bg-neutral-50/50">
                    <TableRow>
                    {view === 'applications' && (
                        <>
                        <TableHead>Student</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </>
                    )}
                    {view === 'students' && (
                        <>
                        <TableHead>Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Parent UID</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </>
                    )}
                    {view === 'fees' && (
                        <>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </>
                    )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto text-neutral-300" />
                            </TableCell>
                        </TableRow>
                    ) : filteredData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-neutral-400 font-serif italic">
                                No {view} found matching your search.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredData.map((item) => (
                            <TableRow key={item.id} className="group hover:bg-neutral-50/50 transition-colors">
                                {view === 'applications' && <ApplicationRow app={item} />}
                                {view === 'students' && <StudentRow student={item} />}
                                {view === 'fees' && <InvoiceRow invoice={item} />}
                            </TableRow>
                        ))
                    )}
                </TableBody>
                </Table>
            </Card>
          </>
      )}
    </div>
  );
}

function AnalyticsDashboard() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MiniStats icon={<Activity className="w-4 h-4" />} label="Retention Rate" value="98%" trend="+2% vs LY" />
                <MiniStats icon={<CardIcon className="w-4 h-4" />} label="Avg. Fee Payment" value="$2,400" trend="Stable" />
                <MiniStats icon={<TrendingUp className="w-4 h-4" />} label="Waitlist" value="45" trend="+15 this week" />
                <MiniStats icon={<TrendingDown className="w-4 h-4" />} label="Outstanding" value="$12.1k" trend="Requires attention" color="text-red-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-neutral-200">
                    <CardHeader>
                        <CardTitle className="text-sm font-mono uppercase tracking-widest text-neutral-400">Enrollment Growth</CardTitle>
                        <CardDescription>Monthly new student registrations.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dummyAnalytics}>
                                <defs>
                                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" fontSize={11} stroke="#888" axisLine={false} tickLine={false} />
                                <YAxis fontSize={11} stroke="#888" axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                                />
                                <Area type="monotone" dataKey="students" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-neutral-200">
                    <CardHeader>
                        <CardTitle className="text-sm font-mono uppercase tracking-widest text-neutral-400">Financial Performance</CardTitle>
                        <CardDescription>Fee collection efficiency against targets.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dummyAnalytics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" fontSize={11} stroke="#888" axisLine={false} tickLine={false} />
                                <YAxis fontSize={11} stroke="#888" axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={{ fill: '#f8f8f8' }}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px' }} 
                                />
                                <Bar dataKey="fees" fill="#171717" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function MiniStats({ icon, label, value, trend, color }: { icon: any, label: string, value: string, trend: string, color?: string }) {
    return (
        <Card className="border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-neutral-100 rounded-lg">{icon}</div>
                <span className={`text-[10px] font-mono ${color || 'text-neutral-400'}`}>{trend}</span>
            </div>
            <p className="text-[10px] uppercase font-mono tracking-tight text-neutral-400">{label}</p>
            <h4 className="text-xl font-bold">{value}</h4>
        </Card>
    );
}

function ApplicationRow({ app }: { app: Application }) {
    const [viewOpen, setViewOpen] = useState(false);
    
    const handleStatusChange = async (status: string) => {
        try {
            await updateDoc(doc(db, 'applications', app.id), { status });
            toast.success(`Application updated to ${status}`);
            
            if (status === 'accepted') {
                await addDoc(collection(db, 'students'), {
                    name: app.studentName,
                    grade: app.grade,
                    parentId: app.parentEmail,
                    enrolledAt: serverTimestamp(),
                    createdAt: serverTimestamp()
                });
                toast.success('Student record created automatically');
            }
        } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, 'applications');
        }
    }

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        reviewed: 'bg-blue-100 text-blue-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };

    return (
        <>
            <TableCell className="font-medium">
                <div className="flex flex-col">
                    <span>{app.studentName}</span>
                    <span className="text-[10px] text-neutral-400 font-mono truncate max-w-[150px]">{app.id.toUpperCase()}</span>
                </div>
            </TableCell>
            <TableCell><Badge variant="outline" className="font-mono">{app.grade}</Badge></TableCell>
            <TableCell className="text-xs text-neutral-500 font-mono">
                {app.submittedAt ? format(app.submittedAt.toDate(), 'dd MMM yyyy') : '--'}
            </TableCell>
            <TableCell>
                <Badge className={statusColors[app.status]}>{app.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                    <Dialog open={viewOpen} onOpenChange={setViewOpen}>
                        <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-neutral-900" onClick={() => setViewOpen(true)}>
                                <Eye className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl p-0 border-none shadow-2xl overflow-hidden rounded-[2rem]">
                            <div className="h-24 bg-neutral-900 px-8 flex items-center">
                                <h2 className="text-white text-2xl font-black tracking-tighter uppercase italic">Application Artifact</h2>
                            </div>
                            <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-100 shrink-0">
                                                {app.photoUrl ? <img src={app.photoUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-neutral-300"><User className="w-8 h-8" /></div>}
                                            </div>
                                            <div>
                                                <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Student Name</Label>
                                                <p className="font-bold text-xl">{app.studentName}</p>
                                                <Badge variant="secondary" className="mt-1 font-mono">{app.id.slice(0, 8).toUpperCase()}</Badge>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Class</Label>
                                                <p className="font-medium">{app.grade}</p>
                                            </div>
                                            <div>
                                                <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Age / Gender</Label>
                                                <p className="font-medium capitalize">{app.age} yrs / {app.gender}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Aadhaar / DOB</Label>
                                            <p className="font-medium">{app.aadhaarNumber} • {app.dateOfBirth}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Parents Info</Label>
                                            <p className="font-bold text-lg">{app.fatherName} (F) / {app.motherName} (M)</p>
                                            <p className="text-sm text-neutral-500">Contact: {app.parentMobile}</p>
                                            <p className="text-sm text-neutral-500">Income: {app.annualIncome || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Address</Label>
                                            <p className="text-sm text-neutral-600 italic">
                                                {app.village}, {app.district}, {app.state} - {app.pincode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 italic text-sm">
                                    <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Student Contact</Label>
                                    Mobile: {app.mobileNumber} {app.email && `| Email: ${app.email}`}
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button onClick={() => handleStatusChange('accepted')} className="flex-1 bg-green-600 hover:bg-green-700 h-12 rounded-xl flex items-center gap-2">
                                        <Check className="w-4 h-4" /> Approve Admission
                                    </Button>
                                    <Button onClick={() => handleStatusChange('rejected')} variant="destructive" className="flex-1 h-12 rounded-xl flex items-center gap-2">
                                        <X className="w-4 h-4" /> Reject Application
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50" onClick={() => handleStatusChange('accepted')}>
                        <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => handleStatusChange('rejected')}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </>
    );
}

function StudentRow({ student }: { student: Student }) {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this student record?')) return;
        try {
            await deleteDoc(doc(db, 'students', student.id));
            toast.success('Student record deleted');
        } catch (error) {
            handleFirestoreError(error, OperationType.DELETE, 'students');
        }
    }

    return (
        <>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell><Badge variant="outline" className="font-mono">{student.grade}</Badge></TableCell>
            <TableCell className="text-xs text-neutral-500 font-mono truncate max-w-[120px]">{student.parentId}</TableCell>
            <TableCell className="text-xs text-neutral-500 font-mono">
                 {student.enrolledAt ? format(student.enrolledAt.toDate(), 'dd MMM yyyy') : '--'}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <div className="h-8 w-8 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer flex items-center justify-center rounded-md hover:bg-neutral-100">
                                <Eye className="h-4 w-4" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md border-none shadow-2xl overflow-hidden p-0">
                             <div className="h-32 bg-neutral-900 flex items-end p-6">
                                <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-3xl mb-[-40px]">
                                    🎓
                                </div>
                             </div>
                             <div className="pt-12 p-6 space-y-6">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight">{student.name}</h3>
                                    <p className="text-sm text-neutral-500 font-serif italic">{student.grade} Student</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Parent Email</p>
                                        <p className="text-sm font-medium">{student.parentId}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Enrolled Date</p>
                                        <p className="text-sm font-medium">{student.enrolledAt ? format(student.enrolledAt.toDate(), 'dd MMM yyyy') : '--'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Student ID</p>
                                        <p className="text-sm font-mono">{student.id.slice(0, 12)}</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-2">
                                    <Button variant="outline" className="flex-1 rounded-xl h-11" onClick={() => setOpen(false)}>Close</Button>
                                    <Button variant="destructive" className="flex-1 rounded-xl h-11" onClick={handleDelete}>Delete Record</Button>
                                </div>
                             </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </TableCell>
        </>
    );
}

function InvoiceRow({ invoice }: { invoice: Invoice }) {
    const [open, setOpen] = useState(false);
    const statusColors = {
        unpaid: 'bg-yellow-100 text-yellow-800',
        paid: 'bg-green-100 text-green-800',
        overdue: 'bg-red-100 text-red-800'
    };

    const qrValue = `SKYLINE-INV-${invoice.id}-${invoice.amount}`;

    return (
        <>
            <TableCell className="font-medium text-xs font-mono">{invoice.studentId.slice(0,8)}</TableCell>
            <TableCell className="text-sm">{invoice.description}</TableCell>
            <TableCell className="font-bold">${invoice.amount.toLocaleString()}</TableCell>
            <TableCell className="text-xs text-neutral-500 font-mono">
                {invoice.dueDate ? format(new Date(invoice.dueDate), 'dd MMM yyyy') : '--'}
            </TableCell>
            <TableCell>
                <Badge className={statusColors[invoice.status]}>{invoice.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="h-8 w-8 text-neutral-400 hover:text-neutral-900 cursor-pointer flex items-center justify-center rounded-md hover:bg-neutral-100">
                            <Eye className="h-4 w-4" />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md p-0 border-none shadow-2xl overflow-hidden">
                        <div className="p-8 space-y-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-2">School Invoice</h4>
                                    <h3 className="text-2xl font-black tracking-tighter">Skyline Public School</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-mono text-neutral-400">#{invoice.id.slice(0, 8).toUpperCase()}</p>
                                    <p className="text-xs font-medium">{format(new Date(), 'dd MMM yyyy')}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 italic">
                                <div className="space-y-1 flex-1">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Statement for</p>
                                    <p className="font-bold">Student ID: {invoice.studentId.toUpperCase()}</p>
                                    <p className="text-sm text-neutral-600">{invoice.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Amount Due</p>
                                    <p className="text-3xl font-black tracking-tighter">${invoice.amount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                                <div className="p-4 bg-white border-2 border-neutral-100 rounded-3xl shadow-sm">
                                    <QRCodeCanvas 
                                        value={qrValue} 
                                        size={160}
                                        level="H"
                                        includeMargin={false}
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Scan to Pay via Portal</p>
                                    <p className="text-xs text-neutral-500 mt-1">Unique Payment Reference: {qrValue}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-neutral-100 flex gap-2">
                                <Button variant="outline" className="flex-1 rounded-xl h-11" onClick={() => setOpen(false)}>Close</Button>
                                <Button className="flex-1 rounded-xl h-11 bg-neutral-900">Print Invoice</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </>
    );
}

function NewAdmissionDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="bg-blue-950 h-10 px-4 rounded-lg flex items-center gap-2 text-white text-sm font-medium cursor-pointer hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20">
                    <Plus className="w-4 h-4" />
                    New Admission
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-6xl h-[95vh] p-0 border-none shadow-2xl rounded-[3rem] overflow-hidden flex flex-col bg-white">
                <div className="shrink-0 h-16 bg-blue-950 px-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-white text-xl font-black tracking-tighter uppercase italic leading-none">Admission Registry</h2>
                        <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest mt-1">Internal School Protocol</p>
                    </div>
                </div>
                <div className="flex-1 overflow-hidden">
                    <AdmissionForm onSuccess={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

function CreateInvoiceDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        studentId: '',
        amount: '',
        description: '',
        dueDate: ''
    });

    useEffect(() => {
        if (open) {
            getDocs(collection(db, 'students')).then(snap => {
                setStudents(snap.docs.map(d => ({ id: d.id, name: d.data().name })));
            });
        }
    }, [open]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'fees'), {
                ...formData,
                amount: parseFloat(formData.amount),
                status: 'unpaid',
                createdAt: serverTimestamp()
            });
            toast.success('Invoice created successfully');
            setOpen(false);
        } catch (error) {
            handleFirestoreError(error, OperationType.CREATE, 'fees');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="bg-neutral-900 h-10 px-4 rounded-lg flex items-center gap-2 text-white text-sm font-medium cursor-pointer hover:bg-neutral-800 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Invoice
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight">Generate Invoice</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Select Student</Label>
                        <select 
                            className="w-full h-11 px-3 bg-neutral-50 rounded-lg border border-neutral-100 focus:outline-neutral-900 transition-all"
                            value={formData.studentId}
                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                            required
                        >
                            <option value="">Select a student...</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.id.slice(0,5)})</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Amount ($)</Label>
                            <Input 
                                type="number" 
                                placeholder="0.00" 
                                required 
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="bg-neutral-50 border-neutral-100 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Due Date</Label>
                            <Input 
                                type="date" 
                                required 
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="bg-neutral-50 border-neutral-100 h-11"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Description</Label>
                        <Input 
                            placeholder="e.g. Tuition Fee - Q3" 
                            required 
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-neutral-50 border-neutral-100 h-11"
                        />
                    </div>
                    <Button disabled={loading} type="submit" className="w-full h-12 bg-neutral-900 mt-2">
                        {loading ? 'Creating...' : 'Create Invoice'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function AddStudentDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        parentId: ''
    });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'students'), {
                ...formData,
                enrolledAt: serverTimestamp(),
                createdAt: serverTimestamp()
            });
            toast.success('Student added successfully');
            setOpen(false);
        } catch (error) {
            handleFirestoreError(error, OperationType.CREATE, 'students');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="border border-neutral-200 h-10 px-4 rounded-lg flex items-center gap-2 text-sm font-medium cursor-pointer hover:bg-neutral-50 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Student
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight">Manual Enrollment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Full Name</Label>
                        <Input 
                            placeholder="Student Name" 
                            required 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-neutral-50 border-neutral-100 h-11"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Grade</Label>
                            <Input 
                                placeholder="e.g. Grade 10" 
                                required 
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="bg-neutral-50 border-neutral-100 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Parent Email (Ref)</Label>
                            <Input 
                                type="email"
                                placeholder="parent@example.com" 
                                required 
                                value={formData.parentId}
                                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                                className="bg-neutral-50 border-neutral-100 h-11"
                            />
                        </div>
                    </div>
                    <Button disabled={loading} type="submit" className="w-full h-12 bg-neutral-900 mt-2">
                        {loading ? 'Processing...' : 'Enroll Student'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
