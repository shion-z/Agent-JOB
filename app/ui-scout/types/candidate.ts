export interface JobPosition {
  id: string
  title: string
  company: string
  location: string
  type: "general" | "direct"
  status: "公開中" | "停止中"
  publicationStatus: "掲載中" | "非掲載"
  applicationCount: number
  employmentType: "正社員" | "契約社員" | "インターン"
  keywords: string[]
}

export interface TargetListDetail {
  id: string
  name: string
  description: string
  candidateCount: number
  scoutedCount: number // 追加: スカウト送付済み候補者数
  linkedJob?: {
    id: string
    title: string
    company: string
  }
  createdDate: string
  lastAddedDate?: string // 追加
  hasNewCandidates?: boolean // 追加
  newCandidatesCount?: number // 追加
  status: "active" | "archived"
}

export interface WorkHistory {
  id: string
  company: string
  position: string
  period: string
  description: string
}

export interface Education {
  id: string
  school: string
  degree: string
  major: string
  period: string
}

export interface CandidateResume {
  personalInfo: {
    name: string
    age: number
    prefecture: string
    email: string
    phone: string
  }
  workHistory: WorkHistory[]
  education: Education[]
  selfPR: string
  skills: string[]
  languages: string[]
  preferences: {
    salary: string
    location: string
    workStyle: string
  }
}

export interface Candidate {
  id: string
  name: string
  avatar: string
  title: string
  currentCompany: string
  matchRate: number
  status: "unscouted" | "scouted" | "replied" | "declined" // "new" | "contacted" から変更
  lastContact: string
  resume: CandidateResume
}
