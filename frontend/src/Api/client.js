import settings from "./settings";
import { create } from "apisauce";

const apiClient = create({
  baseURL: settings.dev.apiUrl,
});

export default apiClient;
