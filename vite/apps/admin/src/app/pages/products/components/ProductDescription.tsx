type Props = {
  description: string | undefined;
};

const ProductDescription = ({ description }: Props) => {
  const descriptions = (description || '')?.split('\n');

  return (
    <>
      {!!descriptions.length && (
        <ul className="list-group list-group-flush ps-5">
          {descriptions.map((desc, index) => (
            <li
              key={index}
              className="list-group-item border-0 p-0"
              style={{ display: 'list-item' }}
            >
              {desc}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductDescription;
