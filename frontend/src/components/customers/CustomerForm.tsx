import { useState } from 'react';
import { request } from '../../api';

type CustomerFormProps = {
    reload: () => void;
    setMessage: (message: string) => void;
};

export default function CustomerForm({
                                         reload,
                                         setMessage
                                     }: CustomerFormProps) {
    const [form, setForm] = useState({
        customerType: 'INDIVIDUAL',
        fullName: '',
        companyName: '',
        email: '',
        phone: ''
    });

    const submit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            await request('/customers', {
                method: 'POST',
                body: JSON.stringify(form)
            });

            setMessage('Customer registered');

            setForm({
                customerType: 'INDIVIDUAL',
                fullName: '',
                companyName: '',
                email: '',
                phone: ''
            });

            reload();
        } catch (error) {
            setMessage((error as Error).message);
        }
    };

    return (
        <form
            className="form grid"
            onSubmit={submit}
        >
            <label>
                Type

                <select
                    value={form.customerType}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            customerType: event.target.value
                        })
                    }
                >
                    <option value="INDIVIDUAL">
                        INDIVIDUAL
                    </option>

                    <option value="COMPANY">
                        COMPANY
                    </option>
                </select>
            </label>

            <label>
                Full name

                <input
                    required
                    value={form.fullName}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            fullName: event.target.value
                        })
                    }
                />
            </label>

            {form.customerType === 'COMPANY' && (
                <label>
                    Company

                    <input
                        required
                        value={form.companyName}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                companyName: event.target.value
                            })
                        }
                    />
                </label>
            )}

            <label>
                Email

                <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            email: event.target.value
                        })
                    }
                />
            </label>

            <label>
                Phone

                <input
                    required
                    value={form.phone}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            phone: event.target.value
                        })
                    }
                />
            </label>

            <button className="primary">
                Register
            </button>
        </form>
    );
}