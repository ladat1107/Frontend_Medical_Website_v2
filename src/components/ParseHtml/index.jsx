import "./Parse.scss";

const ParseHtml = ({ htmlString }) => {
  return (
    <div className="html-content" dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};


export default ParseHtml;
