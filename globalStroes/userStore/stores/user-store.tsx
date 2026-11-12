


import { createStore } from 'zustand/vanilla';

type CourseType = {
    title : string,
    description: string,
    wp_id: number,
    wp_url: string,
    lessons: string[],
}

export type UserState = {
  recommandedCourses: CourseType[];
};

export type UserActions = {
  setRecommandedCourses: (courses: CourseType[]) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  recommandedCourses: [],
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setRecommandedCourses: (recommandedCourses) => set({ recommandedCourses }),
  }));
};