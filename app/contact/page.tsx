export const metadata = {
  title: "Contact — TLC",
  description: "Contactez l'équipe TLC pour des collaborations, contributions ou questions.",
};

const ContactPage = () => {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact</h1>

      <p className="mt-6 text-zinc-700">
        Pour toute question, collaboration ou contribution, écrivez-nous à :
      </p>

      <p className="mt-4 font-medium">
        <a href="mailto:contact@tlc.example" className="text-primary">
          contact@tlc.example
        </a>
      </p>

      <p className="mt-6 text-zinc-700">Ou ouvrez une issue sur le dépôt GitHub pour discuter d'un sujet précis.</p>
    </section>
  )
}

export default ContactPage