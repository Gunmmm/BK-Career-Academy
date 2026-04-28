import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import ExamCategoryCard from '../components/features/ExamCategoryCard';
import CourseCard from '../components/CourseCard';
import { EXAM_CATEGORIES } from '../data/constants';

interface CoursesProps {
  selectedCategory: number | null;
  activeNavCategory: number;
  dynamicCourses: any[];
  dynamicExams: any[];
  onViewSyllabus: (id: number) => void;
  onRegister: () => void;
  onSelectCategory: (id: number | null) => void;
  onViewMPSC: () => void;
  onViewPolice: () => void;
  onViewMAHATET: () => void;
  onViewDynamicExam?: (examName: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({
  selectedCategory,
  activeNavCategory,
  dynamicCourses,
  dynamicExams,
  onViewSyllabus,
  onRegister,
  onSelectCategory,
  onViewMPSC,
  onViewPolice,
  onViewMAHATET,
  onViewDynamicExam
}) => {
  const [activeCipherId, setActiveCipherId] = React.useState<number | null>(null);
  // Map: category title → examDate string (ISO)
  const [examDates, setExamDates] = useState<Record<string, string>>({});

  // Fetch exam dates from backend once
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const [examsResp, coursesResp, upscResp] = await Promise.all([
          fetch('/api/content/exams'),
          fetch('/api/content/courses'),
          fetch('/api/content/upsc_hub')
        ]);
        
        [examsResp, coursesResp, upscResp].forEach(r => {
          if (!r.ok) console.error(`[FETCH ERROR] ${r.url} returned status ${r.status}`);
        });

        const [examsData, coursesData, upscData] = await Promise.all([
          examsResp.json(),
          coursesResp.json(),
          upscResp.json()
        ]);
        
        const allItems = [
          ...(examsData.items || []),
          ...(coursesData.items || []),
          ...(upscData.items || [])
        ];

        const map: Record<string, string> = {};
        allItems.forEach((item: any) => {
          if (item.examDate && item.category) {
            const cleanKey = item.category.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            // Only set if not already present to preserve the latest item (sorted latest-to-oldest)
            if (!map[cleanKey]) {
              map[cleanKey] = item.examDate;
            }
          }
        });
        setExamDates(map);
      } catch (e) { console.error("Date Fetch Failed:", e); }
    };
    fetchDates();
  }, []);

  const filteredCategories = EXAM_CATEGORIES;

  return (
    <motion.div
      key="courses"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-40 pb-32 px-8 max-w-[1800px] mx-auto"
    >
      <header className="mb-20">
        <h2 className="text-4xl md:text-7xl font-display font-black text-ink uppercase tracking-tighter leading-none mb-6">
          Strategic <span className="text-brand">Portals</span>
        </h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t-4 border-ink">
          <p className="text-lg text-muted font-body max-w-xl">
            Select your mission objective. These strategic portals provide deep-dive resources for India's most prestigious competitive examinations.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => onSelectCategory(null)}
              className={`px-6 py-2 border-2 border-ink font-display font-black text-xs uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-brand shadow-[4px_4px_0_0_#1A1A1A]' : 'bg-white hover:bg-brand/10'}`}
            >
              All Portals
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start mb-32">
        {filteredCategories.map((category, idx) => {
          // Sanitize local title for matching
          const cleanKey = category.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
          const examDate = examDates[cleanKey] || null;

          return (
            <ExamCategoryCard 
              key={category.id}
              category={category}
              idx={idx}
              isOpen={activeCipherId === category.id}
              onToggle={() => setActiveCipherId(activeCipherId === category.id ? null : category.id)}
              onViewSyllabus={() => onViewSyllabus(category.id)}
              onRegister={onRegister}
              isSelected={selectedCategory === category.id}
              onSelect={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
              onViewMPSC={onViewMPSC}
              onViewPolice={onViewPolice}
              onViewMAHATET={onViewMAHATET}
              onViewDynamicExam={onViewDynamicExam}
              examDate={examDate}
            />
          );
        })}
      </div>

      {/* Dynamic Courses Section */}
      {dynamicCourses.length > 0 && !selectedCategory && (
        <section className="mt-32">
          <div className="flex flex-col mb-12">
            <div className="w-24 h-2 bg-brand mb-6" />
            <h2 className="text-4xl md:text-6xl font-display font-black text-ink uppercase tracking-tighter leading-none">
              Premium <span className="text-brand">Strategic Programs</span>
            </h2>
            <p className="text-muted mt-6 text-lg font-body max-w-2xl">
              Specialized coaching programs added via our administrative network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {dynamicCourses.map((course, index) => (
              <CourseCard 
                key={course._id || course.id} 
                course={course} 
                index={index} 
                onClick={() => {
                  if (course.subCategory || course.title) {
                    onViewDynamicExam && onViewDynamicExam(course.subCategory || course.title);
                  }
                }}
              />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default Courses;
