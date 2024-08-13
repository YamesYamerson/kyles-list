import React, { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { Book, MusicNote, Film, Tv, MusicPlayer, FileEarmarkMusic, Image, FileEarmark, Disc, Cassette, Vinyl, Database, Controller } from 'react-bootstrap-icons';
import CategoryAccordion from '../components/CategoryAccordion';

const KylesPage = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState({ audio: false, video: false, text: false, other: false });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  const toggleCategory = (category) => {
    setOpenCategory((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupByInitialLetterRange = (items) => {
    const ranges = [
      { start: 'A', end: 'D' },
      { start: 'E', end: 'H' },
      { start: 'I', end: 'L' },
      { start: 'M', end: 'P' },
      { start: 'Q', end: 'T' },
      { start: 'U', end: 'Z' }
    ];
    return ranges.reduce((acc, range) => {
      const key = `${range.start}-${range.end}`;
      acc[key] = items.filter(
        (item) => item.charAt(0).toUpperCase() >= range.start && item.charAt(0).toUpperCase() <= range.end
      );
      return acc;
    }, {});
  };

  if (!filteredData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-lg-10">
          {/* Search Bar Placeholder */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Audio Category */}
          <div className="my-4">
            <Button variant="outline-primary" className="w-100" onClick={() => toggleCategory('audio')}>
              Audio
            </Button>
            <Collapse in={openCategory.audio}>
              <div className="row text-center mt-2">
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <MusicNote className="me-2" /> Music
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <MusicPlayer className="me-2" /> Audio Book
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Disc className="me-2" /> CD
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Cassette className="me-2" /> Cassette
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Vinyl className="me-2" /> Record
                  </Button>
                </div>
              </div>
            </Collapse>
          </div>

          {/* Video Category */}
          <div className="my-4">
            <Button variant="outline-primary" className="w-100" onClick={() => toggleCategory('video')}>
              Video
            </Button>
            <Collapse in={openCategory.video}>
              <div className="row text-center mt-2">
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Film className="me-2" /> Movie
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Tv className="me-2" /> TV Show
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Controller className="me-2" /> Nintendo
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Controller className="me-2" /> Sega/Sony
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Controller className="me-2" /> Microsoft
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Controller className="me-2" /> Computer
                  </Button>
                </div>
              </div>
            </Collapse>
          </div>

          {/* Text Category */}
          <div className="my-4">
            <Button variant="outline-primary" className="w-100" onClick={() => toggleCategory('text')}>
              Text
            </Button>
            <Collapse in={openCategory.text}>
              <div className="row text-center mt-2">
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Book className="me-2" /> Book
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <FileEarmarkMusic className="me-2" /> Music Book
                  </Button>
                </div>
              </div>
            </Collapse>
          </div>

          {/* Other Category */}
          <div className="my-4">
            <Button variant="outline-primary" className="w-100" onClick={() => toggleCategory('other')}>
              Other
            </Button>
            <Collapse in={openCategory.other}>
              <div className="row text-center mt-2">
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Image className="me-2" /> Image
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <FileEarmark className="me-2" /> GIF
                  </Button>
                </div>
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                  <Button variant="outline-primary" className="w-100">
                    <Database className="me-2" /> Data
                  </Button>
                </div>
              </div>
            </Collapse>
          </div>

          {/* Accordion */}
          <div className="accordion" id="accordionExample">
            {Object.keys(filteredData).map((category, index) => {
              if (Array.isArray(filteredData[category])) {
                const items = filteredData[category];
                if (items.length > 50) {
                  const groupedItems = groupByInitialLetterRange(items);
                  return (
                    <CategoryAccordion
                      key={category}
                      id={`category-${index}`}
                      title={category}
                      subCategories={groupedItems}
                    />
                  );
                } else {
                  return (
                    <CategoryAccordion
                      key={category}
                      id={`category-${index}`}
                      title={category}
                      items={items}
                    />
                  );
                }
              } else if (typeof filteredData[category] === 'object') {
                return Object.keys(filteredData[category]).map((subCategory, subIndex) => {
                  const items = filteredData[category][subCategory];
                  if (items.length > 50) {
                    const groupedItems = groupByInitialLetterRange(items);
                    return (
                      <CategoryAccordion
                        key={`${category}-${subCategory}`}
                        id={`subcategory-${index}-${subIndex}`}
                        title={`${category} - ${subCategory}`}
                        subCategories={groupedItems}
                      />
                    );
                  } else {
                    return (
                      <CategoryAccordion
                        key={`${category}-${subCategory}`}
                        id={`subcategory-${index}-${subIndex}`}
                        title={`${category} - ${subCategory}`}
                        items={items}
                      />
                    );
                  }
                });
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KylesPage;
