export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
  color: string;
}
