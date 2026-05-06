import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { 
    collection, 
    query, 
    where, 
    onSnapshot, 
    doc, 
    updateDoc, 
    addDoc, 
    serverTimestamp,
    getDocs
} from 'firebase/firestore';
import { Invoice, Student, Application } from '../types';
import { QRCodeCanvas } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { AdmissionForm } from './AdmissionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
    CreditCard, 
    CheckCircle2, 
    Calendar,
    ArrowRight,
    User,
    Wallet,
    Star,
    Clock,
    LayoutDashboard,
    FileText,
    Plus
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { 
    ResponsiveContainer, 
    RadialBarChart, 
    RadialBar, 
    Legend, 
    PolarAngleAxis,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

const dummyGrades = [
    { subject: 'Math', score: 85, avg: 72 },
    { subject: 'Science', score: 92, avg: 78 },
    { subject: 'History', score: 78, avg: 75 },
    { subject: 'English', score: 88, avg: 82 },
    { subject: 'Art', score: 95, avg: 88 },
];

const attendanceData = [
    { name: 'Attendance', value: 94, fill: '#171717' },
];
export function StudentDashboard() {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!user) return;

        // Fetch Applications
        const qApps = query(collection(db, 'applications'), where('parentId', '==', user.uid));
        const unsubApps = onSnapshot(qApps, (snap) => {
            const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
            setApplications(items);
        }, (err) => handleFirestoreError(err, OperationType.LIST, 'applications'));

        // Find students linked to this parent email
        const qStudents = query(collection(db, 'students'), where('parentId', '==', user.email));
        const unsubStudents = onSnapshot(qStudents, (snap) => {
            const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
            setStudents(items);
            
            if (items.length > 0) {
                const studentIds = items.map(s => s.id);
                // Get invoices for these students
                const qInvoices = query(collection(db, 'fees'), where('studentId', 'in', studentIds));
                const unsubInvoices = onSnapshot(qInvoices, (iSnap) => {
                    const iItems = iSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));
                    setInvoices(iItems);
                    setLoading(false);
                }, (err) => handleFirestoreError(err, OperationType.LIST, 'fees'));
                
                return () => unsubInvoices();
            } else {
                setLoading(false);
            }
        }, (err) => handleFirestoreError(err, OperationType.LIST, 'students'));

        return () => {
            unsubApps();
            unsubStudents();
        };
    }, [user]);

    const handlePay = async (invoice: Invoice) => {
        try {
            await updateDoc(doc(db, 'fees', invoice.id), { status: 'paid' });
            await addDoc(collection(db, 'payments'), {
                invoiceId: invoice.id,
                amount: invoice.amount,
                paidAt: serverTimestamp(),
                userId: user?.uid,
                method: 'Demo Payment'
            });
            toast.success('Payment successful!');
        } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, 'fees');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic text-blue-950">Parent Portal</h2>
                    <p className="text-sm text-neutral-500 font-serif italic">Manage your children's records and admissions.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-neutral-900 rounded-xl text-white shadow-lg shadow-neutral-200">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 leading-none mb-1">Total Outstanding</p>
                        <p className="text-2xl font-black leading-none text-blue-950">
                            ${invoices.filter(i => i.status === 'unpaid' || i.status === 'overdue').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-neutral-100/50 p-1 rounded-2xl border border-neutral-200/50">
                    <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="admissions" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
                        <FileText className="w-3.5 h-3.5" />
                        Admissions
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 mt-0 outline-none">
                    {students.length === 0 ? (
                        <Card className="border-dashed border-2 border-neutral-200 bg-neutral-50/30 py-20 rounded-[2.5rem]">
                            <CardContent className="flex flex-col items-center text-center space-y-6">
                                <div className="p-6 bg-white shadow-xl shadow-neutral-200/50 rounded-full">
                                    <User className="w-10 h-10 text-neutral-300" />
                                </div>
                                <div className="max-w-sm space-y-2">
                                    <CardTitle className="text-2xl font-black tracking-tight uppercase italic text-blue-950">No Enrolled Students</CardTitle>
                                    <CardDescription className="text-base font-serif italic">
                                        Once your admission application is approved, your child's academic dashboard will be activated here.
                                    </CardDescription>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="rounded-xl border-neutral-200 font-black uppercase text-[10px] tracking-widest h-12 px-8"
                                    onClick={() => {
                                        // Force switch to admissions tab
                                        document.querySelector('[value="admissions"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                                    }}
                                >
                                    Go to Admissions
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400">Academic Scorecard</h3>
                                <Card className="border-neutral-200 shadow-sm overflow-hidden rounded-3xl">
                                    <CardHeader className="pb-2 bg-neutral-50/50 border-b border-neutral-100">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-orange-500" />
                                            <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Subject Wise Progress</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="h-[300px] pt-6">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={dummyGrades} layout="vertical" margin={{ left: 20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="subject" type="category" fontSize={11} stroke="#888" axisLine={false} tickLine={false} />
                                                <Tooltip />
                                                <Bar dataKey="score" fill="#1e1b4b" radius={[0, 4, 4, 0]} barSize={20} />
                                                <Line dataKey="avg" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth={2} dot={false} />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="border-neutral-200 rounded-3xl bg-blue-950 text-white shadow-xl shadow-blue-900/10">
                                        <CardHeader className="p-6 pb-2">
                                            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Overall GPA</p>
                                        </CardHeader>
                                        <CardContent className="p-6 pt-0">
                                            <div className="text-4xl font-black tracking-tighter italic">3.82</div>
                                            <p className="text-[9px] text-orange-400 font-black uppercase tracking-widest mt-1">+0.2 from last term</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-neutral-200 rounded-3xl overflow-hidden">
                                        <CardHeader className="p-6 pb-2">
                                            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">Class Rank</p>
                                        </CardHeader>
                                        <CardContent className="p-6 pt-0">
                                            <div className="text-4xl font-black tracking-tighter italic text-blue-950">4 <span className="text-base text-neutral-300 font-medium">/ 32</span></div>
                                            <p className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest mt-1">Top 15%</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400">Vital Statistics</h3>
                                <Card className="border-neutral-200 flex flex-row items-center p-6 gap-6 rounded-3xl">
                                    <div className="w-28 h-28 shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadialBarChart innerRadius="70%" outerRadius="100%" data={attendanceData} startAngle={180} endAngle={-180}>
                                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                                <RadialBar background dataKey="value" cornerRadius={10} fill="#1e1b4b" />
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-orange-500" />
                                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">Attendance Rate</p>
                                        </div>
                                        <h4 className="text-3xl font-black text-blue-950">94.2%</h4>
                                        <p className="text-[10px] text-neutral-400 font-serif italic">Consistent with school standards.</p>
                                    </div>
                                </Card>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 pl-1">Financial Alerts</p>
                                    {invoices.map(invoice => (
                                        <motion.div key={invoice.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Card className={`border-neutral-200 rounded-3xl overflow-hidden transition-all duration-300 ${invoice.status === 'paid' ? 'opacity-50 grayscale bg-neutral-50 shadow-none border-neutral-100' : 'shadow-xl shadow-neutral-200/50 border-l-[6px] border-l-blue-950'}`}>
                                                <CardContent className="p-6">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div>
                                                            <p className="text-[9px] uppercase font-mono tracking-[0.3em] text-neutral-400 mb-1">Invoice #{invoice.id.slice(0,6)}</p>
                                                            <h4 className="font-black text-blue-950 uppercase italic text-sm">{invoice.description}</h4>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-black tracking-tighter text-blue-950">${invoice.amount.toLocaleString()}</p>
                                                            <div className="flex items-center gap-1 text-[9px] text-neutral-400 font-mono mt-1 uppercase tracking-widest justify-end">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                Due {invoice.dueDate ? format(new Date(invoice.dueDate), 'dd MMM') : '--'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <Badge className={`rounded-xl px-4 py-1.5 font-black uppercase text-[10px] tracking-widest shadow-none border-none ${invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                            {invoice.status}
                                                        </Badge>
                                                        <div className="flex gap-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <div className="rounded-xl h-10 px-5 border border-neutral-200 flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 cursor-pointer transition-colors">
                                                                        QR
                                                                    </div>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-xs p-10 flex flex-col items-center gap-6 rounded-[2.5rem]">
                                                                    <div className="text-center space-y-1">
                                                                        <h4 className="font-black uppercase tracking-tighter italic text-xl">Finance QR</h4>
                                                                        <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Skyline Public School Registry</p>
                                                                    </div>
                                                                    <div className="p-4 bg-white border-4 border-neutral-100 rounded-3xl">
                                                                        <QRCodeCanvas value={`SKYLINE-INV-${invoice.id}-${invoice.amount}`} size={160} />
                                                                    </div>
                                                                    <p className="text-[10px] font-mono text-neutral-300">#{invoice.id.toUpperCase()}</p>
                                                                </DialogContent>
                                                            </Dialog>

                                                            {invoice.status !== 'paid' && (
                                                                <Button 
                                                                    size="sm" 
                                                                    className="bg-blue-950 hover:bg-blue-900 text-white rounded-xl h-10 px-6 font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                                                                    onClick={() => handlePay(invoice)}
                                                                >
                                                                    Pay
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="admissions" className="mt-0 outline-none">
                    <AnimatePresence mode="wait">
                        {!showForm ? (
                            <motion.div 
                                key="list"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 pl-1">Admissions Overview</h3>
                                    <Button 
                                        onClick={() => setShowForm(true)}
                                        className="bg-blue-950 hover:bg-blue-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest h-10 px-6 shadow-lg shadow-blue-900/20"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Admission
                                    </Button>
                                </div>

                                {applications.length === 0 ? (
                                    <Card className="border-neutral-200 rounded-[2.5rem] bg-neutral-50/30 py-20 border-dashed border-2 flex flex-col items-center text-center space-y-6">
                                        <div className="p-6 bg-white shadow-xl shadow-neutral-200/50 rounded-full">
                                            <FileText className="w-10 h-10 text-neutral-200" />
                                        </div>
                                        <div className="max-w-sm space-y-2">
                                            <h4 className="text-xl font-black text-blue-950 uppercase italic tracking-tighter">No Active Applications</h4>
                                            <p className="text-sm font-serif italic text-neutral-400">
                                                Begin your journey with Skyline Public School by submitting your first admission application.
                                            </p>
                                        </div>
                                        <Button 
                                            onClick={() => setShowForm(true)}
                                            variant="outline"
                                            className="rounded-xl border-neutral-200 font-black uppercase text-[10px] tracking-widest h-12 px-8"
                                        >
                                            Start Application
                                        </Button>
                                    </Card>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {applications.map(app => (
                                            <Card key={app.id} className="border-neutral-200 rounded-3xl shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-500">
                                                <CardContent className="p-6 space-y-5">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em] mb-1">Applying for {app.grade}</p>
                                                            <h4 className="text-lg font-black text-blue-950 uppercase italic tracking-tighter leading-tight">{app.studentName}</h4>
                                                        </div>
                                                        <Badge className={`
                                                            rounded-lg px-3 py-1 font-black uppercase text-[10px] tracking-widest shadow-none border-none
                                                            ${app.status === 'pending' ? 'bg-orange-100 text-orange-700' : ''}
                                                            ${app.status === 'accepted' ? 'bg-green-100 text-green-700' : ''}
                                                            ${app.status === 'rejected' ? 'bg-red-100 text-red-700' : ''}
                                                        `}>
                                                            {app.status}
                                                        </Badge>
                                                    </div>
                                                    
                                                    <div className="space-y-3">
                                                        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                animate={{ width: app.status === 'accepted' ? '100%' : app.status === 'pending' ? '30%' : '100%' }}
                                                                className={`h-full ${app.status === 'rejected' ? 'bg-red-500' : 'bg-blue-950'}`}
                                                            />
                                                        </div>
                                                        <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                                                            <span>Ref: #{app.id.slice(0, 8).toUpperCase()}</span>
                                                            <span>{app.submittedAt ? format(app.submittedAt.toDate(), 'dd MMM') : '--'}</span>
                                                        </div>
                                                    </div>

                                                    {app.status === 'pending' && (
                                                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 text-[11px] text-blue-900/60 font-serif italic leading-relaxed">
                                                            "Under review by the admissions board. We appreciate your patience."
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Button 
                                            variant="ghost" 
                                            onClick={() => setShowForm(false)}
                                            className="h-10 w-10 p-0 rounded-xl bg-neutral-100 hover:bg-neutral-200"
                                        >
                                            <LayoutDashboard className="w-4 h-4 rotate-[-90deg]" />
                                        </Button>
                                        <div>
                                            <h3 className="text-xl font-black text-blue-950 uppercase italic tracking-tighter">New Admission Form</h3>
                                            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Skyline Public School Admission Artifact</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-2xl shadow-neutral-200/40 overflow-hidden min-h-[85vh] flex flex-col">
                                    <AdmissionForm onSuccess={() => setShowForm(false)} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </TabsContent>
            </Tabs>
        </div>
    );
}
