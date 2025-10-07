export interface Complaint {
  report_id: number;
  prompt_id: number;
  prompt_title: string;
  reporter_id: number;
  reporter_nickname: string;
  created_at: string;
  is_read: 'true' | 'false';
}

export interface AdminComplaintResponse {
  message: string;
  data: {
    reports: Complaint[];
    has_more: boolean;
  };
  statusCode: number;
}

export interface ComplaintDetail {
  report_id: number;
  prompt_id: number;
  prompt_title: string;
  reporter_id: number;
  reporter_nickname: string;
  reporter_email: string;
  prompt_type: string;
  description: string;
  created_at: string;
  isRead: boolean;
}

export interface AdminComplaintDetailResponse {
  message: string;
  data: ComplaintDetail;
  statusCode: number;
}
