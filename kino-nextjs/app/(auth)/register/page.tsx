import SignupForm from '../../components/SignupForm';

export default function Page() {
    return (
        <section className="flex flex-col justify-center items-center w-full h-screen m-auto">
            <h1 className="text-custom_yellow text-3xl mb-6">Skapa konto</h1>
            <SignupForm />
            <p className="text-white text-xl mt-6 mb-2">Har du redan ett konto?</p>
            <a className="text-white font-semibold underline hover:opacity-80" href="/login">Logga in</a>
        </section>
    );
}