document.addEventListener('DOMContentLoaded', function() {
  // Navigation elements
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const subTabs = document.querySelectorAll('.sub-tab');
  const subTabContents = document.querySelectorAll('.subtab-content');

  // Modals
  const addSourceModal = document.getElementById('add-source-modal');
  const eventsModal = document.getElementById('events-modal');
  const pkModal = document.getElementById('pk-modal');
  const semanticsModal = document.getElementById('semantics-modal');
  const runningStitchModal = document.getElementById('running-stitch-modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  // Buttons and interactive elements
  const addSourceBtn = document.querySelector('.add-source-btn');
  const choosePkBtn = document.querySelector('[data-action="choose-pk"]');
  const tagSemanticsBtn = document.querySelector('[data-action="tag-semantics"]');
  const runStitchBtn = document.querySelector('.run-stitch-btn');
  const exitBtn = document.querySelector('.exit-btn');
  const connectorItems = document.querySelectorAll('.connector-item');
  const eventsTab = document.querySelector('[data-subtab="events"]');
  const cleaningRules = document.querySelectorAll('.cleaning-rule');
  const transformationOptions = document.querySelectorAll('.option');

  // Main tab navigation
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      navTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show the corresponding content
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
      
      // Reset sub-tabs to show the first one as active
      resetSubTabs(tabId);
    });
  });

  // Reset sub-tabs to first one when switching main tabs
  function resetSubTabs(tabId) {
    const relevantSubTabs = document.querySelectorAll(`#${tabId}-content .sub-tab`);
    const relevantSubContents = document.querySelectorAll(`#${tabId}-content .subtab-content`);
    
    relevantSubTabs.forEach(t => t.classList.remove('active'));
    relevantSubContents.forEach(c => c.classList.remove('active'));
    
    // Activate first sub-tab
    if (relevantSubTabs.length > 0) {
      relevantSubTabs[0].classList.add('active');
      
      // Find corresponding content using data-subtab attribute
      const firstSubtabId = relevantSubTabs[0].getAttribute('data-subtab');
      document.getElementById(`${firstSubtabId}-content`).classList.add('active');
    }
  }

  // Sub-tab navigation
  subTabs.forEach(subTab => {
    subTab.addEventListener('click', () => {
      // Find parent tab content
      const parentTab = subTab.closest('.tab-content');
      
      // Remove active class from sub-tabs in this parent tab
      parentTab.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
      parentTab.querySelectorAll('.subtab-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked sub-tab
      subTab.classList.add('active');
      
      // Show corresponding content
      const subTabId = subTab.getAttribute('data-subtab');
      document.getElementById(`${subTabId}-content`).classList.add('active');
      
      // Special handling for Events tab
      if (subTabId === 'events') {
        showEventsModal();
      }
    });
  });

  // Modal functions
  function showModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Create and dispatch a custom event when modal is hidden
    const event = new CustomEvent('hidden');
    modal.dispatchEvent(event);
  }

  function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      hideModal(modal);
    });
  }

  // Close buttons for all modals
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      hideModal(modal);
    });
  });

  // Click outside to close modal
  window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (e.target === modal) {
        hideModal(modal);
      }
    });
  });

  // Add Data Source button
  addSourceBtn.addEventListener('click', () => {
    showModal(addSourceModal);
  });

  // Events Tab - Show modal when Events tab is clicked
  function showEventsModal() {
    // Delay showing the modal slightly to avoid immediate display on tab click
    setTimeout(() => {
      showModal(eventsModal);
      // Switch back to Connections tab after modal is closed
      const onModalClose = function() {
        const connectionsTab = document.querySelector('[data-subtab="connections"]');
        connectionsTab.click();
        // Remove the event listener to avoid memory leaks
        eventsModal.removeEventListener('hidden', onModalClose);
      };
      
      // Custom event for when modal is hidden
      eventsModal.addEventListener('hidden', onModalClose);
    }, 100);
  }

  // Primary Key selection button
  choosePkBtn.addEventListener('click', () => {
    showModal(pkModal);
  });

  // Tag Semantics button
  tagSemanticsBtn.addEventListener('click', () => {
    showModal(semanticsModal);
  });

  // Run Stitch button
  runStitchBtn.addEventListener('click', () => {
    showModal(runningStitchModal);
    
    // Simulate processing delay with a visual progress indication
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(progressInterval);
        hideModal(runningStitchModal);
        
        // Switch to Summary tab after completion
        const summaryTab = document.querySelector('[data-subtab="summary"]');
        summaryTab.click();
      }
    }, 300); // 300ms * 10 steps = ~3 seconds total
  });

  // Exit button in Summary tab
  exitBtn.addEventListener('click', () => {
    // Switch back to Configuration tab
    const configTab = document.querySelector('[data-subtab="configuration"]');
    configTab.click();
  });

  // Connector items
  connectorItems.forEach(item => {
    item.addEventListener('click', () => {
      const connectorName = item.querySelector('span').textContent;
      alert(`${connectorName} connector selected. Initiating connection setup...`);
      hideModal(addSourceModal);
    });
  });

  // Events tab click handling
  eventsTab.addEventListener('click', () => {
    showEventsModal();
  });

  // Interactive behavior for cleaning rules
  cleaningRules.forEach(rule => {
    rule.addEventListener('click', () => {
      const ruleName = rule.querySelector('span').textContent;
      rule.classList.toggle('selected');
    });
  });

  // Transformation options
  transformationOptions.forEach(option => {
    option.addEventListener('click', () => {
      const optionType = option.getAttribute('data-option');
      
      // Deselect all options
      transformationOptions.forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Select clicked option
      option.classList.add('selected');
      
      // Show different UI based on option selected
      if (optionType === 'join-tables') {
        alert('Opening join tables interface...');
      } else if (optionType === 'custom-sql') {
        alert('Opening SQL editor...');
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
});