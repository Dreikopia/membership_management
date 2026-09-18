export default function GuestLayout({ children }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <main className="w-full max-w-2xl px-6">
                {children}
            </main>
        </div>
    );
}