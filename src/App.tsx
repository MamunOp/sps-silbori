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
  Clock
} from 'lucide-react';
import { Button } from './components/ui/button';
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [intendedTab, setIntendedTab] = useState<string | null>(null);

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
      <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center p-4">
        <Button 
            variant="ghost" 
            className="mb-8 text-neutral-500 hover:text-neutral-900"
            onClick={() => setViewMode('landing')}
        >
            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Website
        </Button>
        <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-4 transform -rotate-3">
              <School className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
                {intendedTab === 'apply' ? 'Apply to Skyline' : 'Portal Login'}
            </CardTitle>
            <CardDescription className="text-neutral-500 italic font-serif">
              Skyline Public School Management System
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-center text-sm text-neutral-600">
              {intendedTab === 'apply' 
                ? 'Sign in to start your school admission application.' 
                : 'Please sign in with your school-registered Google account to access your personalized dashboard.'}
            </p>
            <Button 
              onClick={() => handleSignIn(intendedTab || 'dashboard')} 
              className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-all active:scale-95"
            >
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-neutral-100 py-4">
            <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest leading-none">
              Admission Hub • Student Portal • Finance
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-900 rounded-xl">
              <School className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Skyline</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<LayoutDashboard className="w-4 h-4" />} 
            label="Overview" 
          />
          {profile?.role === 'admin' ? (
            <>
              <NavButton 
                active={activeTab === 'admissions'} 
                onClick={() => setActiveTab('admissions')} 
                icon={<UserPlus className="w-4 h-4" />} 
                label="Admissions" 
              />
              <NavButton 
                active={activeTab === 'students'} 
                onClick={() => setActiveTab('students')} 
                icon={<Users className="w-4 h-4" />} 
                label="Students" 
              />
              <NavButton 
                active={activeTab === 'attendance'} 
                onClick={() => setActiveTab('attendance')} 
                icon={<Clock className="w-4 h-4" />} 
                label="Attendance" 
              />
              <NavButton 
                active={activeTab === 'fees'} 
                onClick={() => setActiveTab('fees')} 
                icon={<Receipt className="w-4 h-4" />} 
                label="Finance" 
              />
            </>
          ) : (
            <>
              <NavButton 
                active={activeTab === 'apply'} 
                onClick={() => setActiveTab('apply')} 
                icon={<GraduationCap className="w-4 h-4" />} 
                label="Admissions" 
              />
              <NavButton 
                active={activeTab === 'portal'} 
                onClick={() => setActiveTab('portal')} 
                icon={<CreditCard className="w-4 h-4" />} 
                label="My Portal" 
              />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
              {user.displayName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.displayName}</p>
              <p className="text-xs text-neutral-500 uppercase tracking-tighter">{profile?.role}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-neutral-500 hover:text-red-600 hover:bg-red-50 h-9 px-3" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-neutral-200 bg-white/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10 md:hidden">
            <div className="flex items-center gap-2">
                <School className="w-6 h-6 text-sky-900" />
                <span className="font-bold tracking-tight">Skyline</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
            </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <ViewContent activeTab={activeTab} role={profile?.role} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <AIAssistant />
      <Toaster />
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'bg-neutral-100 text-neutral-900 shadow-sm shadow-neutral-200' 
          : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
      }`}
    >
      {icon}
      <span>{label}</span>
      {active && <ChevronRight className="ml-auto w-3 h-3 text-neutral-400" />}
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
