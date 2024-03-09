import httpRequest from "@/api";

const reportsApi = {
  GetAll: '/reports/get',
  GetNickNames: '/reports/get_all_nicknames',
  GetByCond: '/reports/get_by_cond'
}

/**
 * getAllReports function
 * query: {
 *   page: 1,
 *   size: 20
 * }
 * @param query
 * @returns {*}
 */
export function getAllReports(query) {
  return httpRequest({
    url: reportsApi.GetAll,
    method: 'get',
    params: query
  })
}

/**
 * getAllNickNames function
 * @returns {*}
 */
export function getAllNickNames() {
  return httpRequest({
    url: reportsApi.GetNickNames,
    method: 'get'
  })
}

/**
 * getReportsByCond function
 * parameter {
 *   start: "2023-04-01",
 *   end: "2023-04-03",
 *   nickname: "三螺旋DNA",
 *   keyword: "外挂",
 * }
 * query {
 *   page: 1,
 *   size: 20
 * }
 * @param parameter
 * @param query
 * @returns {*}
 */
export function getReportsByCond(parameter, query) {
  return httpRequest({
    url: reportsApi.GetByCond,
    method: 'post',
    params: query,
    data: parameter,
  })
}
