import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

// Components
import RegistrationModal from './components/RegistrationModal';
import AdmissionFormModal from './components/AdmissionFormModal';
import ChatWidget from './components/ChatWidget';
import AdminPortal from './components/AdminPortal';
import LeadLogin from './components/LeadLogin';
import ScrollToTop from './components/ScrollToTop';

// Layout & Common
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { SyllabusPortal } from './pages/SyllabusPortal';
import { AboutUPSC } from './pages/SyllabusContent/UPSCAbout';
import { MPSCDetailsPage } from './pages/MPSCDetailsPage';
import { PoliceDetailsPage } from './pages/PoliceDetailsPage';
import { MAHATETDetailsPage } from './pages/MAHATETDetailsPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { AboutUs } from './pages/AboutUs';
import { DynamicExamDetailsPage } from './pages/DynamicExamDetailsPage';
import AddStoryModal from './components/AddStoryModal';
import { INITIAL_STORIES, Story } from './data/stories';

// Data
import { EXAM_CATEGORIES } from './data/constants';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'courses' | 'syllabus' | 'about' | 'adminLogin' | 'courseDetailMPSC' | 'courseDetailPolice' | 'courseDetailMAHATET' | 'successStories' | 'dynamicExamDetail'>('home');

  // URL Path Routing for Admin Portal
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin-portal') {
      setView('adminLogin');
    }
  }, []);

  // Update URL when view changes (simple history management)
  useEffect(() => {
    if (view === 'adminLogin') {
      if (window.location.pathname !== '/admin-portal') {
        window.history.pushState({}, '', '/admin-portal');
      }
    } else if (window.location.pathname === '/admin-portal') {
      window.history.pushState({}, '', '/');
    }
  }, [view]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<number | null>(null);
  const [selectedExamName, setSelectedExamName] = useState<string>('');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);

  const [stories, setStories] = useState<Story[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bk_success_stories");
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    }
    return INITIAL_STORIES;
  });

  useEffect(() => {
    localStorage.setItem("bk_success_stories", JSON.stringify(stories));
  }, [stories]);

  const handleAddStory = (newStory: Omit<Story, 'id' | 'initials'>) => {
    const story: Story = {
      ...newStory,
      id: Date.now(),
      initials: newStory.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    setStories(prev => [story, ...prev]);
  };
  
  const [isAuthorized, setIsAuthorized] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bk_authorized_user") ? true : false;
    }
    return false;
  });

  const [isGuest, setIsGuest] = useState(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("bk_authorized_user") || "{}");
      return user.isGuest === true;
    }
    return false;
  });

  const [showMandatoryLogin, setShowMandatoryLogin] = useState(false);
  const [dynamicCourses, setDynamicCourses] = useState<any[]>([]);
  const [dynamicExams, setDynamicExams] = useState<any[]>([]);
  const [quickAccessList, setQuickAccessList] = useState<any[]>([]);

  const fetchAllContent = async () => {
    try {
      const endpoints = [
        '/api/content/courses',
        '/api/content/upsc_hub',
        '/api/content/quick_exam_access',
        '/api/content/exams'
      ];
      
      const responses = await Promise.all(endpoints.map(url => fetch(url)));
      const dataResults = await Promise.all(responses.map(async (res, idx) => {
        if (!res.ok) {
          console.error(`Fetch failed for ${endpoints[idx]}: ${res.status}`);
          return { items: [] };
        }
        try {
          return await res.json();
        } catch (e) {
          console.error(`JSON parse failed for ${endpoints[idx]}`);
          return { items: [] };
        }
      }));

      const [coursesData, upscData, quickData, examsData] = dataResults;
      
      // Process Courses (strictly from courses and upsc_hub sections)
      const courses = [
        ...(coursesData.items || []), 
        ...(upscData.items || [])
      ].filter(item => item.section !== 'exams') // Explicit filter
      .map(item => ({
        ...item,
        id: item._id, 
        image: item.image || '/home/card1.png',
        isNew: true
      }));

      // Process Exams (strictly from exams section)
      const exams = (examsData.items || [])
        .filter(item => item.section === 'exams') // Explicit filter
        .map(item => ({
        ...item,
        id: item._id,
        image: item.image || '/home/card1.png',
        isNew: true
      }));
      
      setDynamicCourses(courses);
      setDynamicExams(exams);
      setQuickAccessList(quickData.items || []);
    } catch (err) {
      console.error("Failed to fetch dynamic content:", err);
    }
  };

  useEffect(() => {
    if (view === 'home' || view === 'courses') {
      fetchAllContent();
    }

    const seoData: Record<string, { title: string; description: string }> = {
      home: {
        title: "BK Career Academy | UPSC, MPSC & Competitive Exam Coaching Nashik",
        description: "Join Nashik's most trusted coaching academy for UPSC, MPSC, Banking, and SSC exams. Expert guidance, proven success, and comprehensive study material."
      },
      courses: {
        title: "Explore Courses | UPSC, MPSC, Banking, SSC | BK Academy",
        description: "Discover our specialized coaching programs for civil services and competitive exams. Flexible batches and expert-led sessions in Nashik."
      },
      syllabus: {
        title: "Detailed UPSC Syllabus & Exam Pattern | BK Academy",
        description: "Get the complete UPSC Civil Services syllabus, exam pattern, and preparation strategy. Your ultimate guide to cracking the IAS/IPS exams."
      },
      about: {
        title: "About Us | Our Vision & Success Stories | BK Academy",
        description: "Learn about BK Career Academy's 15-year legacy of empowering students. Our mission, our network, and our commitment to educational excellence."
      },
      courseDetailMPSC: {
        title: "MPSC Coaching in Nashik | Syllabus & Batch Details",
        description: "Ace the MPSC Rajyaseva and Subordinate Services exams with our targeted coaching. Full GS and CSAT coverage with mock tests."
      },
      courseDetailPolice: {
        title: "Police Bharti Training Nashik | Physical & Written Prep",
        description: "Complete preparation for Maharashtra Police Recruitment. Expert physical training and dedicated written exam coaching in Nashik."
      },
      courseDetailMAHATET: {
        title: "MAHA TET Exam Coaching | Teacher Eligibility Test Prep",
        description: "Prepare for MAHA TET and CTET with Nashik's leading experts. Comprehensive coverage of Child Development, Pedagogy, and Subject-specific topics."
      },
      successStories: {
        title: "Success Stories | Real Results from Our Students",
        description: "Read inspiring stories from our successful candidates who cracked UPSC, MPSC, and Banking exams with BK Career Academy."
      }
    };

    const currentSEO = seoData[view] || seoData.home;
    document.title = currentSEO.title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [view]);

  const handleLeadLogin = (data: any, skip: boolean = false) => {
    localStorage.setItem("bk_authorized_user", JSON.stringify({ ...data, isGuest: skip, ts: new Date().toISOString() }));
    setIsAuthorized(true);
    setIsGuest(skip);
    setShowMandatoryLogin(false);
  };

  return (
    <ErrorBoundary fallback="A critical error occurred. Please refresh the page.">
      <div className="relative min-h-screen bg-background text-ink font-body selection:bg-brand selection:text-ink overflow-x-hidden">
        <AnimatePresence>
          {!isAuthorized && <LeadLogin onLogin={handleLeadLogin} />}
          {showMandatoryLogin && <LeadLogin onLogin={handleLeadLogin} showSkip={false} onCancel={() => setShowMandatoryLogin(false)} />}
        </AnimatePresence>

        {view === 'adminLogin' ? (
          <AdminPortal onBack={() => setView('home')} onUpdate={fetchAllContent} />
        ) : (
          <>
            <Navbar 
              view={view}
              setView={setView}
              setSelectedCategory={setSelectedCategory}
              setSelectedSyllabusId={setSelectedSyllabusId}
              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
              setIsAdmissionModalOpen={setIsAdmissionModalOpen}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />

            <main className="pl-0 md:pl-52 relative min-h-screen">
              <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
                style={{
                  backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
              <div className="relative z-10 overflow-x-hidden">
                <AnimatePresence mode="wait">
                  {view === 'home' && (
                    <Home 
                      setView={setView} 
                      setSelectedCategory={setSelectedCategory} 
                      setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                      setIsAdmissionModalOpen={setIsAdmissionModalOpen}
                      setIsAddStoryModalOpen={setIsAddStoryModalOpen}
                      dynamicCourses={dynamicCourses}
                      dynamicExams={dynamicExams}
                      stories={stories.slice(0, 2)}
                      setSelectedExamName={setSelectedExamName}
                      quickAccessList={quickAccessList}
                    />
                  )}
                  {view === 'courses' && (
                    <Courses 
                      selectedCategory={selectedCategory}
                      activeNavCategory={EXAM_CATEGORIES[0].id}
                      dynamicCourses={dynamicCourses}
                      dynamicExams={dynamicExams}
                      onViewSyllabus={(id) => {
                        setSelectedSyllabusId(id);
                        if (id === 1) {
                           setView('syllabus');
                        } else {
                           // Fallback for other categories if content not yet extracted
                           alert("Full content for this category is coming soon. Only UPSC is currently ported.");
                        }
                      }}
                      onViewMPSC={() => setView('courseDetailMPSC')}
                      onViewPolice={() => setView('courseDetailPolice')}
                      onViewMAHATET={() => setView('courseDetailMAHATET')}
                      onViewDynamicExam={(examName) => {
                        setSelectedExamName(examName);
                        setView('dynamicExamDetail');
                      }}
                      onRegister={() => setIsRegistrationModalOpen(true)}
                      onSelectCategory={setSelectedCategory}
                    />
                  )}
                  {view === 'courseDetailPolice' && (
                    <PoliceDetailsPage 
                      onBack={() => setView('courses')}
                      onRegister={() => setIsRegistrationModalOpen(true)}
                      setView={setView}
                      setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                      setIsAdmissionModalOpen={setIsAdmissionModalOpen}
                    />
                  )}
                  {view === 'courseDetailMAHATET' && (
                    <MAHATETDetailsPage 
                      onBack={() => setView('courses')}
                      onRegister={() => setIsRegistrationModalOpen(true)}
                      setView={setView}
                      setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                      setIsAdmissionModalOpen={setIsAdmissionModalOpen}
                    />
                  )}
                  {view === 'syllabus' && (
                    <SyllabusPortal 
                      category={EXAM_CATEGORIES[0]} // UPSC as default or handle others
                      onBack={() => setView('home')}
                      onRegister={() => setIsRegistrationModalOpen(true)}
                      setView={setView}
                      setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                      setIsAdmissionModalOpen={setIsAdmissionModalOpen}
                      isMenuOpen={isMenuOpen}
                      setIsMenuOpen={setIsMenuOpen}
                      view={view}
                    />
                  )}
                  {view === 'courseDetailMPSC' && (
                    <MPSCDetailsPage 
                      onBack={() => setView('courses')}
                      onRegister={() => setIsRegistrationModalOpen(true)}
                      setView={setView}
                      setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                      setIsAdmissionModalOpen={setIsAdmissionModalOpen}
                    />
                  )}
                  {view === 'dynamicExamDetail' && (
                    <DynamicExamDetailsPage 
                      examName={selectedExamName}
                      onBack={() => setView('courses')}
                      onRegister={() => setIsRegistrationModalOpen(true)}
                    />
                  )}
                  {view === 'about' && (
                    <AboutUs />
                  )}
                  {view === 'successStories' && (
                    <SuccessStoriesPage 
                      stories={stories} 
                      onBack={() => setView('home')} 
                      onAddYours={() => setIsAddStoryModalOpen(true)}
                    />
                  )}
                </AnimatePresence>

                <Footer 
                  setView={setView}
                  setSelectedCategory={setSelectedCategory}
                  setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                  setSelectedExamName={setSelectedExamName}
                />
              </div>
            </main>

            <RegistrationModal 
              isOpen={isRegistrationModalOpen} 
              onClose={() => setIsRegistrationModalOpen(false)} 
            />

            <AdmissionFormModal 
              isOpen={isAdmissionModalOpen} 
              onClose={() => setIsAdmissionModalOpen(false)} 
            />

            <AddStoryModal 
              isOpen={isAddStoryModalOpen}
              onClose={() => setIsAddStoryModalOpen(false)}
              onAdd={handleAddStory}
            />

            <div onClickCapture={(e) => { if(isGuest) { e.stopPropagation(); setShowMandatoryLogin(true); } }}>
              <ChatWidget />
            </div>

            <ScrollToTop />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
