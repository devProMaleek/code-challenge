/**
 * The main component of the application.
 * Renders the header, select community section, event summary section, and table section.
 */
import React, { useState } from 'react';
import { Texts } from '../infra/constants';
import { SelectCommunity } from './components/SelectCommunity.jsx';
import { Table } from './components/Table.jsx';
import { EventSummary } from './components/EventSummary.jsx';

export function App() {
  // State for storing the selected community
  const [selectedCommunity, setSelectedCommunity] = useState();

  // Common styles for each section
  const sectionStyles = 'bg-white dark:bg-gray-800';

  return (
    <main>
      {/* Header section */}
      <header className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl p-4 mx-auto text-center lg:p-6">
          {/* Title */}
          <h1 className="mb-2 text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-3xl dark:text-white">
            {Texts.HOME_TITLE}
          </h1>
          {/* Subtitle */}
          <p className="mb-4 text-sm font-normal text-green-500 lg:text-base sm:px-16 xl:px-48 dark:text-gray-400">
            {Texts.HOME_SUBTITLE}
          </p>
        </div>
      </header>
      {/* Select Community section */}
      <section className={sectionStyles}>
        <div className="max-w-md px-4 mx-auto text-center lg:px-6">
          {/* SelectCommunity component with onChange handler to update selectedCommunity state */}
          <SelectCommunity onChange={setSelectedCommunity} />
        </div>
      </section>
      {/* Event Summary section */}
      <section className={sectionStyles}>
        <div className="max-w-screen-xl p-4 mx-auto text-center lg:p-6">
          {/* EventSummary component with selectedCommunity prop */}
          <EventSummary selectedCommunity={selectedCommunity} />
        </div>
      </section>
      {/* Table section */}
      <section className={sectionStyles}>
        <div className="max-w-screen-xl p-4 mx-auto text-center lg:p-6">
          {/* Table component with selectedCommunity prop */}
          <Table selectedCommunity={selectedCommunity} />
        </div>
      </section>
    </main>
  );
}
