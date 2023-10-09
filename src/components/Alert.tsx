export default function Alert({ value }) {
  return (
    <div className="px-5 py-2 text-white bg-red-500 z-10 rounded-md">{value}</div>
  );
}