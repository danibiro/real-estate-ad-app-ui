class AdCreationDTO {
  title: string;
  description: string;
  address: string;
  price: number;
  dateOfCreation: Date;
  negotiable: boolean;
  area: number;
  agentId: number;

  constructor(
    title: string,
    description: string,
    address: string,
    price: number,
    dateOfCreation: Date,
    negotiable: boolean,
    area: number,
    agentId: number
  ) {
    this.title = title;
    this.description = description;
    this.address = address;
    this.price = price;
    this.dateOfCreation = dateOfCreation;
    this.negotiable = negotiable;
    this.area = area;
    this.agentId = agentId;
  }
}

export default AdCreationDTO;
