export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MeatUp. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
