import { registerLicense } from '@syncfusion/ej2-base';
import { DocumentEditorContainerComponent, Toolbar, SpellChecker, Inject, ToolbarItem, CustomToolbarItemModel, DocumentEditor } from '@syncfusion/ej2-react-documenteditor';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';
import './App.css'
import {useEffect, useState} from 'react';

// Register Syncfusion license
registerLicense(import.meta.env.VITE_SYNCFUSION_KEY);

const CONTAINER_ID = 'documenteditor';

const insertedText = [
  {
    text: '\n'
  },
  {
    text: 'Heading',
    style: 'ESHeadingCenter'
  },
  {
    text: '\n'
  },
  {
    text: 'This is a test text',
    style: 'EscribersNormal'
  },
  {
    text: '\n'
  },
  {
    text: 'Q  ',
    style: 'ESQandA'
  }
]

function App() {
  let documentEditorContainer: DocumentEditorContainerComponent | null = null;
  const [currentState, setCurrentState] = useState({});



  useEffect(() => {
    componentDidMount()
  }, []);


  function componentDidMount(): void {
    if (!documentEditorContainer) return;
    const documentEditor = documentEditorContainer.documentEditor;
    if (!documentEditor) return;

    documentEditor.spellChecker.languageID = 1033 //LCID of "en-us";
    documentEditor.spellChecker.removeUnderline = false;
    documentEditor.spellChecker.allowSpellCheckAndSuggestion = true;
  }

  const handleToolbarClick = (args: ClickEventArgs): void => {
    if (args.item.id === 'insert_test') {
      insertText();
    } else if (args.item.id === 'log_sfdt') {
      logSFDT();
    }
  };

  const insertText = () => {
    if (!documentEditorContainer) return;
    
    const documentEditor = documentEditorContainer.documentEditor;
    if (!documentEditor) return;

    documentEditor.editorHistory.beginUndoAction();

    insertedText.forEach((item) => {
        if (item.style) {
          documentEditor.editor.applyStyle(item.style, true);
        }

      documentEditor.editor.insertText(item.text);

    })

    documentEditor.editorHistory.endUndoAction();
  };

  const toolbarItems: (ToolbarItem | CustomToolbarItemModel)[] = [
    'New',
    'Open',
    'Undo',
    'Redo',
      'Bookmark',
    {
      prefixIcon: '',
      tooltipText: 'Insert Text',
      text: 'Insert Text',
      id: 'insert_test'
    } as CustomToolbarItemModel,
    {
      prefixIcon: '',
      tooltipText: 'Log SFDT',
      text: 'Log SFDT',
      id: 'log_sfdt'
    } as CustomToolbarItemModel
  ];

  const logSFDT = () => {
    if (!documentEditorContainer) return;
    const documentEditor = documentEditorContainer.documentEditor;
    if (!documentEditor) return;
    const sfdt: any = JSON.parse(documentEditor.serialize());
    setCurrentState(sfdt.sec[0].b);
  }

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      <DocumentEditorContainerComponent
        id={CONTAINER_ID}
        height="100%"
        width="70%"
        enableToolbar={true}
        enableSpellCheck={true}
        ref={(scope) => {
          documentEditorContainer = scope;
        }}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        showPropertiesPane={false}
        enableLocalPaste={true}
        toolbarItems={toolbarItems}
        toolbarClick={handleToolbarClick}
      >
        <Inject services={[Toolbar, SpellChecker]}></Inject>
      </DocumentEditorContainerComponent>
      <div style={{ width: '30%', height: '100%', overflow: 'auto', backgroundColor: '#1E1E1E' }}>
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{ margin: 0, minHeight: '100%' }}
        >
          {JSON.stringify(currentState, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default App;

