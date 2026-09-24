import CustomerForm from '../components/customers/CustomerForm';
import CustomerTable from '../components/customers/CustomerTable';

import type { Customer } from '../types';

type CustomersProps = {
    data: Customer[];
    reload: () => void;
    setMessage: (message: string) => void;
};

export default function Customers({
                                      data,
                                      reload,
                                      setMessage
                                  }: CustomersProps) {
    return (
        <>
            <section className="panel">
                <h2>Register customer</h2>

                <CustomerForm
                    reload={reload}
                    setMessage={setMessage}
                />
            </section>

            <section className="panel">
                <h2>Customers</h2>

                <CustomerTable
                    data={data}
                    reload={reload}
                    setMessage={setMessage}
                />
            </section>
        </>
    );
}