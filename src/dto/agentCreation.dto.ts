class AgentCreationDTO {
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number;

  constructor(
    name: string,
    email: string,
    phone: string,
    address: string,
    age: number
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.age = age;
  }
}
export default AgentCreationDTO;
