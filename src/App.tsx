import {useEffect} from 'react';
import { registerLicense } from '@syncfusion/ej2-base';
import { DocumentEditorContainerComponent, Toolbar, SpellChecker, Inject, ToolbarItem, CustomToolbarItemModel } from '@syncfusion/ej2-react-documenteditor';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
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

// Register Syncfusion license
registerLicense(import.meta.env.VITE_SYNCFUSION_KEY);

const CONTAINER_ID = 'documenteditor';

const insertedText ='(Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the)'
const commentText = 'test'
const bookmarkName = 'test'

function App() {
  let documentEditorContainer: DocumentEditorContainerComponent | null = null;

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
    } else if (args.item.id === 'download') {
      downloadFile();
    }
  };

  const insertText = () => {
    if (!documentEditorContainer) return;
    
    const documentEditor = documentEditorContainer.documentEditor;
    if (!documentEditor) return;
    documentEditor.editorHistory.beginUndoAction();
    documentEditor.editor.handleEnterKey();
    documentEditor.editor.insertText(insertedText);
    documentEditor.selection.selectLine();
    documentEditor.editor.insertComment(commentText);
    documentEditor.selection.moveToLineEnd();

    documentEditor.selection.selectLine();
    documentEditor.editor.insertBookmark(bookmarkName + Math.random());
    documentEditor.selection.moveToLineEnd();

    documentEditor.editorHistory.endUndoAction();
  };

  const downloadFile = () => {
    if (!documentEditorContainer) return;
    documentEditorContainer.documentEditor.save('doc', 'Docx');
  }

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
      tooltipText: 'Download',
      text: 'Download',
      id: 'download'
    } as CustomToolbarItemModel
  ];



  return (
    <div>
      <DocumentEditorContainerComponent
        id={CONTAINER_ID}
        height="100vh"
        width="100%"
        enableToolbar={true}
        enableSpellCheck={true}
        ref={(scope: DocumentEditorContainerComponent) => {
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
    </div>
  );
}

export default App;

