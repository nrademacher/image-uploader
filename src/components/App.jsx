import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const App = () => {
  const [copyLinks, setCopyLinks] = useState([]);

  // specify upload params and API url to file upload
  const getUploadParams = ({ file }) => {
    const body = new FormData();
    body.append('dataFiles', file);
    return {
      url: 'https://dry-shore-64957.herokuapp.com/images/postImages',
      body,
    };
  };

  // handle the status of the file upload
  const handleChangeStatus = ({ xhr }) => {
    if (xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          setCopyLinks((prev) => [
            ...prev,
            { value: result.data.imageUrl, copied: false },
          ]);
        }
      };
    }
  };

  return (
    <div className="App">
      <h1 className="py-4 text-center font-bold text-xl">
        Image Uploader (JPG & PNG)
      </h1>
      <section>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          styles={{
            dropzone: {
              overflow: 'auto',
              border: '1px solid #999',
              background: '#f5f5f5',
            },
            inputLabelWithFiles: { margin: '20px 3%' },
          }}
          canRemove={false}
          accept="image/*"
        />
      </section>
      <section className="p-4 flex flex-col items-center justify-center">
        {copyLinks.map((link, i) => {
          return (
            <>
              <a href={link.value} target="_blank">
                <img
                  src={link.value}
                  alt={`image ${i + 1}`}
                  className="rounded-md mb-2 max-w-xl"
                />
              </a>
              <article
                key={link.value}
                className="flex w-full md:w-auto flex-col md:flex-row mb-4"
              >
                <span className="p-2 text-[10px] w-full md:w-auto md:text-xs bg-gray-100 border-2 border-gray-200 rounded mb-1 md:mb-0 mr-2">
                  {link.value}
                </span>
                <CopyToClipboard
                  text={link.value}
                  onCopy={() => {
                    link.copied = true;
                    setCopyLinks(copyLinks);
                  }}
                >
                  <button className="p-2 text-xs md:text-sm text-[#2484ff] font-semibold bg-[#e6e6e6] rounded transition-all duration-200 hover:bg-[#2484ff] hover:text-[#e6e6e6]">
                    Copy to clipboard
                  </button>
                </CopyToClipboard>
              </article>
            </>
          );
        })}
      </section>
    </div>
  );
};

export default App;
