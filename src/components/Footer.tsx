import GitHub from '/github.svg';

export default function Footer() {
  return (
    <footer className="shade container flex justify-center items-center gap-2 py-1">
      <a href="https://github.com/owlbeard">
        <img
          className="h-12 white hover:scale-110"
          src={GitHub}
          alt="GitHub Cat"
        />
      </a>
      <p>Copyright 2023 || Ömer F. Altun</p>
    </footer>
  );
}
