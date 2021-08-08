interface IOptions {
  year: 'numeric' | '2-digit' | undefined;
  month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day: 'numeric' | '2-digit' | undefined;
}

type getReadableDateType = (date: Date) => string;

const options: IOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const getReadableDate: getReadableDateType = (date: Date) => date.toLocaleString('en-US', options);

export default getReadableDate;
