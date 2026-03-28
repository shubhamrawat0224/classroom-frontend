import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
import { API_URL } from "./constants";
import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import { data } from "react-router";
import { Subjects } from "@/types";

const mockSubjects: Subjects[] = [
  {
    id: 1,
    Code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description: "A foundational course covering basic programming concepts, algorithms, and data structures.",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    Code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description: "Advanced calculus topics including integration techniques, series, and multivariable functions.",
    createdAt: new Date("2023-01-02"),
  },
  {
    id: 3,
    Code: "ENG301",
    name: "Advanced English Literature",
    department: "English",
    description: "Exploration of classic and modern literature with emphasis on critical analysis and writing.",
    createdAt: new Date("2023-01-03"),
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({resource}:GetListParams): Promise<GetListResponse<TData>> => {
    if(resource !== 'subjects') {
      return {data: [] as TData[], total: 0}
    }
    return {
      data: mockSubjects as unknown as TData[],
      total: mockSubjects.length
    }
  },
  getOne: async () => {
    throw new Error("Function not implemented.");
  },
  create: async () => {
    throw new Error("Function not implemented.");
  },
  update: async () => {
    throw new Error("Function not implemented.");
  },
  deleteOne: async () => {
    throw new Error("Function not implemented.");
  },

  getApiUrl: () => '',

}
