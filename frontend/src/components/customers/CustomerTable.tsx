import { request } from '../../api';
import type { Customer } from '../../types';

type CustomerTableProps = {
    data: Customer[];
    reload: () => void;
    setMessage: (message: string) => void;
};

export default function CustomerTable({
                                          data,
                                          reload,
                                          setMessage
                                      }: CustomerTableProps) {
    const deactivate = async (id: number) => {
        try {
            await request(
                `/customers/${id}/deactivate`,
                {
                    method: 'PATCH'
                }
            );

            reload();
        } catch (error) {
            setMessage((error as Error).message);
        }
    };

    return (
        <div className="tablewrap">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th />
                </tr>
                </thead>

                <tbody>
                {data.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.fullName}</td>

                        <td>
                            {customer.customerType}
                        </td>

                        <td>
                            {customer.companyName || '—'}
                        </td>

                        <td>{customer.email}</td>

                        <td>{customer.phone}</td>

                        <td>
                            {customer.active
                                ? 'Active'
                                : 'Inactive'}
                        </td>

                        <td>
                            {customer.active && (
                                <button
                                    className="danger"
                                    onClick={() =>
                                        deactivate(customer.id)
                                    }
                                >
                                    Deactivate
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}