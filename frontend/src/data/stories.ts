export interface Story {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  initials: string;
}

export const INITIAL_STORIES: Story[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Strategic Leadership Graduate",
    content: "WE SHAPE CAREERS provided the roadmap I needed to transition from project manager to Titan Executive.",
    rating: 5,
    initials: "AM"
  },
  {
    id: 2,
    name: "Sarah Hughes",
    role: "Executive Alumna",
    content: "Direct access to Industry Giants was the turning point. Mentorship here is a strategic alliance.",
    rating: 5,
    initials: "SH"
  }
];
