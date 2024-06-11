import service from "..";
export function getPhoneLogin(data) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
    })
}