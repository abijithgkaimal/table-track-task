import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./serverUrl";

/*  FOOD APIs */
export const addFoodAPI = async (data) => await commonAPI("POST", `${BASE_URL}/foods`, data);
export const getAllFoodsAPI = async () => await commonAPI("GET", `${BASE_URL}/foods`, "");
export const deleteFoodAPI = async (id) => await commonAPI("DELETE", `${BASE_URL}/foods/${id}`, {});
export const updateFoodAPI = async (id, data) => await commonAPI("PUT", `${BASE_URL}/foods/${id}`, data);

/*  EMPLOYEE APIs  */
export const addEmployeeAPI = async (data) => await commonAPI("POST", `${BASE_URL}/employees`, data);
export const getAllEmployeesAPI = async () => await commonAPI("GET", `${BASE_URL}/employees`, "");
export const deleteEmployeeAPI = async (id) => await commonAPI("DELETE", `${BASE_URL}/employees/${id}`, {});
export const updateEmployeeAPI = async (id, data) => await commonAPI("PUT", `${BASE_URL}/employees/${id}`, data);

/*  TABLE APIs  */
export const getAllTablesAPI = async () => await commonAPI("GET", `${BASE_URL}/tables`, "");
export const updateTableAPI = async (id, data) => await commonAPI("PUT", `${BASE_URL}/tables/${id}`, data);

/*  BILL APIs*/
export const addBillAPI = async (data) => await commonAPI("POST", `${BASE_URL}/bills`, data);
export const getAllBillsAPI = async () => await commonAPI("GET", `${BASE_URL}/bills`, "");
export const deleteBillAPI = async (id) => await commonAPI("DELETE", `${BASE_URL}/bills/${id}`, {});
export const updateBillAPI = async (id, data) => await commonAPI("PUT", `${BASE_URL}/bills/${id}`, data);
