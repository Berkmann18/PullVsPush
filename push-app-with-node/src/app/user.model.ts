interface UserData {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: string;
    city: string;
    postcode: string;
    //...
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    //...
  };
  id: {
    name: string;
    value: string;
  };
}

export interface User {
  results: UserData[];
  info: {
    seed: string,
    results: number,
    page: number,
    version: string
  }
}
