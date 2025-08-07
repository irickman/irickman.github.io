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
  const databaseTablesModal = document.getElementById('database-tables-modal');
  const fileConfigModal = document.getElementById('file-config-modal');
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
  const connectionsGrid = document.querySelector('.connections-grid');
  const gridRows = document.querySelectorAll('.grid-row');
  const connectionDetailView = document.querySelector('.connection-detail-view');
  const backButton = document.querySelector('.back-button');

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

  // Add Data Source dropdown functionality
  const addSourceDropdown = document.querySelector('.add-source-dropdown');
  const dropdownItems = document.querySelectorAll('.add-source-dropdown .dropdown-item');
  
  // Toggle dropdown when button is clicked
  addSourceBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = addSourceDropdown.style.display === 'block';
    addSourceDropdown.style.display = isVisible ? 'none' : 'block';
    addSourceBtn.classList.toggle('active', !isVisible);
  });
  
  // Close dropdown when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.add-source-container')) {
      addSourceDropdown.style.display = 'none';
      addSourceBtn.classList.remove('active');
    }
  });
  
  // Handle dropdown item clicks
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const connector = item.getAttribute('data-connector');
      
      // Hide dropdown
      addSourceDropdown.style.display = 'none';
      addSourceBtn.classList.remove('active');
      
      if (connector === 'other') {
        // Show the "Other Connectors" modal
        showModal(addSourceModal);
      } else {
        // Show connection setup based on connector type
        simulateConnectionSetup(connector);
      }
    });
  });
  
  // Function to handle different connection setup flows
  function simulateConnectionSetup(connectorType) {
    const dbCredentialModal = document.getElementById('db-credential-modal');
    const fileCredentialModal = document.getElementById('file-credential-modal');
    
    // Database connections
    if (['snowflake', 'bigquery', 'databricks'].includes(connectorType)) {
      // Set modal title
      const connectorName = document.querySelector(`[data-connector="${connectorType}"] span`).textContent;
      dbCredentialModal.querySelector('.connector-name').textContent = connectorName;
      
      // Hide all connector fields first
      const connectorFields = dbCredentialModal.querySelectorAll('.connector-fields');
      connectorFields.forEach(field => field.style.display = 'none');
      
      // Show the right connector fields
      const activeFields = document.getElementById(`${connectorType}-fields`);
      if (activeFields) {
        activeFields.style.display = 'block';
      }
      
      // Reset to the first step
      const steps = dbCredentialModal.querySelectorAll('.credential-step');
      steps.forEach(step => step.style.display = 'none');
      steps[0].style.display = 'block';
      
      showModal(dbCredentialModal);
    } 
    // File-based connections
    else if (['aws', 'azure', 'sftp'].includes(connectorType)) {
      // Set modal title
      let connectorName;
      if (connectorType === 'aws') {
        connectorName = 'AWS S3';
      } else if (connectorType === 'azure') {
        connectorName = 'Azure Blob';
      } else {
        connectorName = 'SFTP';
      }
      fileCredentialModal.querySelector('.connector-name').textContent = connectorName;
      
      // Hide all connector fields first
      const connectorFields = fileCredentialModal.querySelectorAll('.connector-fields');
      connectorFields.forEach(field => field.style.display = 'none');
      
      // Show the right connector fields
      const activeFields = document.getElementById(`${connectorType}-fields`);
      if (activeFields) {
        activeFields.style.display = 'block';
      }
      
      // Reset to the first step
      const steps = fileCredentialModal.querySelectorAll('.credential-step');
      steps.forEach(step => step.style.display = 'none');
      steps[0].style.display = 'block';
      
      showModal(fileCredentialModal);
    }
  }
  
  // Database credential modal step navigation
  const dbModalNextButtons = document.querySelectorAll('#db-credential-modal .next-btn');
  const dbModalBackButtons = document.querySelectorAll('#db-credential-modal .back-btn');
  const dbModalCancelButtons = document.querySelectorAll('#db-credential-modal .cancel-btn');
  const dbModalFinishButtons = document.querySelectorAll('#db-credential-modal .finish-btn');
  
  dbModalNextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = button.closest('.credential-step');
      const nextStepName = button.getAttribute('data-next');
      const nextStep = document.querySelector(`#db-credential-modal .credential-step[data-step="${nextStepName}"]`);
      
      // Simulate connection test
      const loadingText = button.textContent;
      button.textContent = "Testing...";
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = loadingText;
        button.disabled = false;
        
        currentStep.style.display = 'none';
        if (nextStep) {
          nextStep.style.display = 'block';
        }
      }, 1500);
    });
  });
  
  dbModalBackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = button.closest('.credential-step');
      const prevStepName = button.getAttribute('data-back');
      const prevStep = document.querySelector(`#db-credential-modal .credential-step[data-step="${prevStepName}"]`);
      
      currentStep.style.display = 'none';
      if (prevStep) {
        prevStep.style.display = 'block';
      }
    });
  });
  
  dbModalCancelButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      hideModal(modal);
    });
  });
  
  dbModalFinishButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Simulate saving connection
      const loadingText = button.textContent;
      button.textContent = "Connecting...";
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = loadingText;
        button.disabled = false;
        
        alert("Connection successfully created! Tables have been imported.");
        const modal = button.closest('.modal');
        hideModal(modal);
      }, 2000);
    });
  });
  
  // File credential modal step navigation
  const fileModalNextButtons = document.querySelectorAll('#file-credential-modal .next-btn');
  const fileModalBackButtons = document.querySelectorAll('#file-credential-modal .back-btn');
  const fileModalCancelButtons = document.querySelectorAll('#file-credential-modal .cancel-btn');
  const fileModalFinishButtons = document.querySelectorAll('#file-credential-modal .finish-btn');
  
  fileModalNextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = button.closest('.credential-step');
      const nextStepName = button.getAttribute('data-next');
      const nextStep = document.querySelector(`#file-credential-modal .credential-step[data-step="${nextStepName}"]`);
      
      if (nextStepName === 'file-browser') {
        // Simulate connection test
        const loadingText = button.textContent;
        button.textContent = "Testing...";
        button.disabled = true;
        
        setTimeout(() => {
          button.textContent = loadingText;
          button.disabled = false;
          
          currentStep.style.display = 'none';
          if (nextStep) {
            nextStep.style.display = 'block';
          }
        }, 1500);
      } else if (nextStepName === 'pattern') {
        // Show selected file name and pattern detection
        const selectedFile = document.querySelector('.file-item.selected');
        if (selectedFile) {
          const fileName = selectedFile.querySelector('.file-name').textContent;
          // Extract pattern from file name, replace date parts with placeholders
          const patternInput = document.getElementById('file-pattern');
          let pattern = fileName;
          if (pattern.match(/\d{8}/)) {
            pattern = pattern.replace(/\d{8}/, 'YYYYMMDD');
          } else if (pattern.match(/\d{4}_\d{2}_\d{2}/)) {
            pattern = pattern.replace(/\d{4}_\d{2}_\d{2}/, 'YYYY_MM_DD');
          }
          patternInput.value = pattern;
          
          currentStep.style.display = 'none';
          if (nextStep) {
            nextStep.style.display = 'block';
          }
        } else {
          alert("Please select a file first");
        }
      }
    });
  });
  
  fileModalBackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = button.closest('.credential-step');
      const prevStepName = button.getAttribute('data-back');
      const prevStep = document.querySelector(`#file-credential-modal .credential-step[data-step="${prevStepName}"]`);
      
      currentStep.style.display = 'none';
      if (prevStep) {
        prevStep.style.display = 'block';
      }
    });
  });
  
  fileModalCancelButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      hideModal(modal);
    });
  });
  
  fileModalFinishButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Simulate saving connection
      const loadingText = button.textContent;
      button.textContent = "Creating...";
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = loadingText;
        button.disabled = false;
        
        alert("Connection successfully created! Daily sync has been scheduled.");
        const modal = button.closest('.modal');
        hideModal(modal);
      }, 2000);
    });
  });
  
  // File browser selection
  const fileItems = document.querySelectorAll('.file-item.file');
  fileItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove selection from all items
      fileItems.forEach(fi => fi.classList.remove('selected'));
      
      // Add selection to clicked item
      item.classList.add('selected');
    });
  });
  
  // Directory navigation
  const directoryItems = document.querySelectorAll('.file-item.directory');
  directoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const dirName = item.querySelector('.file-name').textContent;
      const currentPathElement = document.querySelector('.current-path');
      
      // Add directory to path
      const newSegment = document.createElement('span');
      newSegment.className = 'path-segment';
      newSegment.textContent = dirName;
      currentPathElement.appendChild(newSegment);
      
      // In a real app, we would load directory contents here
      alert(`Navigating to ${dirName} directory. In a real app, this would load the directory contents.`);
    });
  });
  
  // Search files functionality
  const fileSearch = document.getElementById('file-search');
  if (fileSearch) {
    fileSearch.addEventListener('input', function() {
      const searchQuery = this.value.toLowerCase();
      const fileItems = document.querySelectorAll('.file-item');
      
      fileItems.forEach(item => {
        const fileName = item.querySelector('.file-name').textContent.toLowerCase();
        if (fileName.includes(searchQuery)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
  
  // SFTP authentication method toggle
  const sftpAuthOptions = document.querySelectorAll('input[name="sftp-auth"]');
  sftpAuthOptions.forEach(option => {
    option.addEventListener('change', function() {
      const passwordField = document.getElementById('sftp-password-field');
      const keyField = document.getElementById('sftp-key-field');
      
      if (this.value === 'password') {
        passwordField.style.display = 'block';
        keyField.style.display = 'none';
      } else {
        passwordField.style.display = 'none';
        keyField.style.display = 'block';
      }
    });
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
  
  // Connection grid row click handler
  gridRows.forEach(row => {
    row.addEventListener('click', () => {
      const connectionType = row.getAttribute('data-connection-type');
      const connectionName = row.getAttribute('data-connection');
      const connectionDisplayName = row.querySelector('.connection-name').textContent;
      const connectionIcon = row.querySelector('.connection-icon i').cloneNode(true);
      
      if (connectionType === 'database') {
        // Show database tables modal
        const modalConnectionInfo = databaseTablesModal.querySelector('.modal-connection-info');
        modalConnectionInfo.querySelector('.connection-icon').innerHTML = '';
        modalConnectionInfo.querySelector('.connection-icon').appendChild(connectionIcon);
        modalConnectionInfo.querySelector('.connection-name').textContent = connectionDisplayName;
        
        // Hide all table lists first
        const tableLists = databaseTablesModal.querySelectorAll('.tables-list');
        tableLists.forEach(list => list.style.display = 'none');
        
        // Show the appropriate tables list
        const tablesList = databaseTablesModal.querySelector(`#${connectionName}-tables`);
        if (tablesList) {
          tablesList.style.display = 'block';
        }
        
        showModal(databaseTablesModal);
      } else if (connectionType === 'file') {
        // Show file configuration modal
        const modalConnectionInfo = fileConfigModal.querySelector('.modal-connection-info');
        modalConnectionInfo.querySelector('.connection-icon').innerHTML = '';
        modalConnectionInfo.querySelector('.connection-icon').appendChild(connectionIcon);
        modalConnectionInfo.querySelector('.connection-name').textContent = connectionDisplayName;
        
        // Hide all config sections first
        const configSections = fileConfigModal.querySelectorAll('.config-section');
        configSections.forEach(section => section.style.display = 'none');
        
        // Show the appropriate config section
        const configSection = fileConfigModal.querySelector(`#${connectionName}-config`);
        if (configSection) {
          configSection.style.display = 'block';
        }
        
        showModal(fileConfigModal);
      }
    });
  });
  
  // Table search functionality
  const tableSearch = document.getElementById('table-search');
  if (tableSearch) {
    tableSearch.addEventListener('input', function() {
      const searchQuery = this.value.toLowerCase();
      const visibleTablesList = document.querySelector('.tables-list[style="display: block"]') || document.querySelector('.tables-list:not([style="display: none"])');
      
      if (visibleTablesList) {
        const tableRows = visibleTablesList.querySelectorAll('.table-row');
        tableRows.forEach(row => {
          const tableName = row.querySelector('.table-cell').textContent.toLowerCase();
          if (tableName.includes(searchQuery)) {
            row.style.display = 'grid';
          } else {
            row.style.display = 'none';
          }
        });
      }
    });
  }
  
  // Back button in connection detail view
  if (backButton) {
    backButton.addEventListener('click', () => {
      connectionDetailView.style.display = 'none';
      connectionsGrid.style.display = 'block';
    });
  }
});