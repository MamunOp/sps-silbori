import React, { useState } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { auth, googleProvider } from './lib/firebase';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { 
  School, 
  LayoutDashboard, 
  UserPlus, 
  Receipt, 
  Users, 
  LogOut, 
  ChevronRight,
  GraduationCap,
  CreditCard,
  ClipboardCheck,
  Clock,
  PanelLeftClose,
  PanelLeftOpen,
  Menu
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { AdmissionForm } from './components/AdmissionForm';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AIAssistant } from './components/AIAssistant';
import { AttendanceSystem } from './components/AttendanceSystem';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

import { LandingPage } from './components/LandingPage';

type ViewMode = 'landing' | 'auth';

function MainLayout() {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('admissions');
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [intendedTab, setIntendedTab] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSignIn = async (targetTab?: string) => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (targetTab) setActiveTab(targetTab);
      toast.success('Successfully signed in!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setViewMode('landing');
      setIntendedTab(null);
      toast.success('Signed out.');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <School className="w-12 h-12 text-neutral-400" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    if (viewMode === 'landing') {
        return (
            <LandingPage 
                onLoginClick={() => {
                    setViewMode('auth');
                    setIntendedTab('dashboard');
                }} 
                onApplyClick={() => {
                    setViewMode('auth');
                    setIntendedTab('apply');
                }} 
            />
        );
    }

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-md"
        >
            <Button 
                variant="ghost" 
                className="mb-10 text-slate-400 hover:text-slate-900 transition-all font-bold uppercase text-[10px] tracking-[0.3em]"
                onClick={() => setViewMode('landing')}
            >
                <ChevronRight className="w-4 h-4 mr-3 rotate-180" />
                Back to portal
            </Button>
            
            <Card className="w-full border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="text-center space-y-4 pt-12 pb-8">
                <div className="mx-auto w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-2 shadow-2xl shadow-slate-900/20">
                  <School className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                    <CardTitle className="text-4xl font-display font-bold tracking-tight text-slate-900 uppercase">
                        {intendedTab === 'apply' ? 'Enroll Now' : 'Authority Registry'}
                    </CardTitle>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Skyline Public Records</span>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 px-10 pb-12">
                <p className="text-center text-sm text-slate-500 font-medium leading-relaxed">
                  {intendedTab === 'apply' 
                    ? 'Begin your induction process by authorizing your digital identity.' 
                    : 'Authorized personnel only. Please verify your credentials to access the central management hub.'}
                </p>
                <Button 
                  onClick={() => handleSignIn(intendedTab || 'dashboard')} 
                  className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all active:scale-95 shadow-xl shadow-slate-900/20 font-bold uppercase text-[12px] tracking-[0.2em] flex items-center gap-3"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4 invert brightness-0" alt="" />
                  Verify with Google
                </Button>
              </CardContent>
              <CardFooter className="flex justify-center bg-slate-50 border-t border-slate-100 py-6">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em] leading-none">
                  ISO-27001 SECURED INDUCTION
                </p>
              </CardFooter>
            </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 flex font-sans selection:bg-slate-900 selection:text-white transition-all duration-500`}>
      {/* Sidebar */}
      <aside className={`border-r border-slate-200 bg-white flex flex-col fixed inset-y-0 left-0 z-50 transition-all duration-500 lg:sticky lg:h-screen ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-0 overflow-hidden border-none'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10 transition-transform hover:scale-110">
              <School className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
                <span className="font-display font-bold text-xl tracking-tight text-slate-900 uppercase">Skyline</span>
                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em] -mt-1">Public Hub</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:flex hidden h-8 w-8 text-slate-400 hover:text-slate-900 rounded-lg"
          >
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        </div>

        <nav className="flex-1 px-5 py-2 space-y-1">
            <div className="mb-4">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3 ml-2">Controls</p>
                <div className="space-y-0.5">
                    <NavButton 
                        active={activeTab === 'admissions'} 
                        onClick={() => setActiveTab('admissions')} 
                        icon={<ClipboardCheck className="w-4 h-4" strokeWidth={2} />} 
                        label="Records Index" 
                    />
                    <NavButton 
                        active={activeTab === 'apply'} 
                        onClick={() => setActiveTab('apply')} 
                        icon={<UserPlus className="w-4 h-4" strokeWidth={2} />} 
                        label="New Induction" 
                    />
                </div>
            </div>
        </nav>

        <div className="p-5">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-200/20 blur-xl rounded-full -mr-8 -mt-8" />
                <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-900 shadow-sm">
                            {user.displayName?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate tracking-tight leading-none mb-1">{user.displayName}</p>
                            <Badge variant="outline" className="border-slate-200 text-slate-400 rounded-full text-[8px] font-bold uppercase tracking-widest px-1.5 h-3.5 leading-none">{profile?.role}</Badge>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 h-9 rounded-lg transition-all font-bold uppercase text-[9px] tracking-widest border border-slate-100 bg-white" onClick={handleSignOut}>
                        <LogOut className="w-3.5 h-3.5 mr-2" />
                        Revoke Access
                    </Button>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Sidebar Toggle for Desktop (When closed) */}
        {!isSidebarOpen && (
            <div className="hidden lg:block absolute left-6 top-6 z-20">
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsSidebarOpen(true)}
                    className="h-10 w-10 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 bg-white text-slate-400 hover:text-slate-900 transition-all active:scale-95"
                >
                    <PanelLeftOpen className="w-5 h-5" />
                </Button>
            </div>
        )}

        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-10 lg:hidden">
            <div className="flex items-center gap-3">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="mr-1 h-9 w-9"
                >
                    <Menu className="w-5 h-5" />
                </Button>
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                    <School className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight uppercase text-slate-900">Skyline</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="rounded-lg h-10 w-10 text-slate-400">
                <LogOut className="w-4 h-4" />
            </Button>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-full"
            >
              <ViewContent activeTab={activeTab} role={profile?.role} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <AIAssistant />
      <Toaster position="top-center" richColors />
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all relative group ${
        active 
          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:translate-x-0.5'}`}>
        {icon}
      </div>
      <span>{label}</span>
      {active && (
          <motion.div 
            layoutId="nav-active"
            className="absolute right-3 w-1 h-1 rounded-full bg-white/40"
          />
      )}
    </button>
  );
}

function ViewContent({ activeTab, role }: { activeTab: string, role?: string }) {
  if (activeTab === 'dashboard') {
    if (role === 'admin') {
      return <AdminDashboard view="dashboard" />;
    }
    return (
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back,</h1>
          <p className="text-neutral-500 italic font-serif opacity-70">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Students Enrolled" value="1,248" change="+12% from last year" icon={<Users className="w-5 h-5" />} />
          <StatsCard title="Applications" value="342" change="56 pending review" icon={<ClipboardCheck className="w-5 h-5" />} />
          <StatsCard title="Fees Collected" value="$42.5k" change="72% of target" icon={<Receipt className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
             <Card className="border-neutral-200">
                <CardHeader>
                    <CardTitle className="text-lg">Recent Activities</CardTitle>
                    <CardDescription>Stay updated with latest school events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ActivityItem title="New Application" description="John Doe submitted for Grade 5" time="2h ago" />
                    <ActivityItem title="Payment Received" description="Invoice #9921 has been settled" time="5h ago" />
                    <ActivityItem title="Grade Posted" description="Semester 1 grades are now live" time="1d ago" />
                </CardContent>
             </Card>
             <Card className="border-neutral-200 bg-neutral-900 text-white shadow-xl shadow-neutral-200">
                <CardHeader>
                    <CardTitle className="text-lg text-white">Announcements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm font-medium">Summer break starts from June 15th. All offices will remain closed during the first week.</p>
                    <Button variant="secondary" className="w-full bg-white text-neutral-900 hover:bg-neutral-100">View All Announcments</Button>
                </CardContent>
             </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'apply') {
    return <AdmissionForm />;
  }

  if (activeTab === 'admissions') {
    return <AdminDashboard view="applications" />;
  }

  if (activeTab === 'students' || activeTab === 'fees') {
    return <AdminDashboard view={activeTab} />;
  }

  if (activeTab === 'attendance') {
    return <AttendanceSystem />;
  }

  if (activeTab === 'portal') {
    return <StudentDashboard />;
  }

  return <div>Content for {activeTab} coming soon...</div>;
}

function StatsCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
    return (
        <Card className="border-neutral-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-neutral-500 font-mono tracking-tight uppercase">
                    {title}
                </CardTitle>
                <div className="p-2 bg-neutral-100 rounded-lg">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-neutral-400 mt-1">{change}</p>
            </CardContent>
        </Card>
    );
}

function ActivityItem({ title, description, time }: { title: string, description: string, time: string }) {
    return (
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="w-2 h-2 rounded-full bg-neutral-900 mt-2 shrink-0" />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <span className="text-xs text-neutral-400 font-mono">{time}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
            </div>
        </div>
    );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
