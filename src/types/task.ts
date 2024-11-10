export type Task =
  | {
      id: number;
      description: string;
      created_at: string;
    }
  | undefined;
