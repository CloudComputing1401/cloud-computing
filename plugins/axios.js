export default async ({ $axios, store, $toast }, inject) => {
  await store.restored;

  $axios.setHeader("Authorization", store.getters["Auth/getToken"]);
  $axios.onError((error) => {
    if (error.response?.status === 500) {
      $toast.error("خطای سرور", {
        timeout: 4000,
        rtl: true,
        position: "bottom-center",
        closeButton: false,
      });
    } else if (!error.response) {
      $toast.error(
        "در اتصال به سرور مشکلی به وجود آمده است، لطفا بعدا مجدد تلاش نمایید.",
        {
          timeout: 4000,
          rtl: true,
          position: "bottom-center",
          closeButton: false,
        }
      );
    }
  });
  inject("get", (url, params) => {
    return $axios.get(`/${url}`, {
      params,
    });
  });
  inject("post", (url, body) => {
    return $axios.post(`/${url}`, body);
  });
  inject("put", (url, body) => {
    return $axios.put(`/${url}`, body);
  });
  inject("deleteReq", (url, data) => {
    return $axios.delete(`/${url}`, {
      data,
    });
  });
};
