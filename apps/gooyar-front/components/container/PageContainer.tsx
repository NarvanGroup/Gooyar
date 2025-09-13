type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[] | any;
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <div>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    <link rel="icon" href="/favicon.png" />
    {children}
  </div>
);

export default PageContainer;
