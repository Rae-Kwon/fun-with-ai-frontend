interface ResultType {
  prompt: {id: string; message: string};
  res: {id: string; message: string; video: VideoResultType};
}

interface VideoResultType {
  id: string;
  thumbnail: any;
  title: string;
}

interface ClearStorageProps {
  clear: any;
  setResults: React.Dispatch<React.SetStateAction<ResultType[]>>;
}

const ClearStorage = ({clear, setResults}: ClearStorageProps) => {
  const clickHandler = () => {
    clear('results');
    setResults([]);
  };

  return (
    <button type="reset" onClick={clickHandler}>
      Clear Results
    </button>
  );
};
export default ClearStorage;
