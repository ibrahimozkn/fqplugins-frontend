interface IRequestResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export default IRequestResponse;
