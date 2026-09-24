type StatCardProps = {
    n: number;
    label: string;
};

export default function StatCard({ n, label }: StatCardProps) {
    return (
        <div className="card">
            <strong>{n}</strong>
            <span>{label}</span>
        </div>
    );
}