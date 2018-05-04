# Record Content Configuration

For record types that contain binary content (currently, only blob), the derivative to be displayed for various types of use may be configured by providing a content descriptor map in the `content` configuration property for the record type.

```
type ContentDescriptorMap = {[type: string]: ContentDescriptor};
```
```
type ContentDescriptor = {
  subresource: string | (recordData: Immutable.Map) => string,
};
```

## Content Types

The content descriptor map is keyed by type, which is one of the following values:

### `popup`

Content to display in a new browser window.

### `preview`

Content to display in the record editor.

### `snapshot`

Content to display in the Media Snapshot panel.

### `thumbnail`

Content to display in Media Snapshot panel thumbnails.

## Subresources

The values in the content descriptor map are subresouce names. Each subresouce name must correspond to a configured content subresource. In a default system, the following content subresources are configured:

- `original`
- `derivativeThumbnail`
- `derivativeMedium`
- `derivativeOriginalJpeg`

## Example

```
cspaceUI({
  recordTypes: {
    blob: {
      content: {
        popup: (recordData) => {
          // Show the originalJpeg derivative if the blob's mime type is an image, or the original
          // otherwise.

          const mimeType = recordData && recordData.getIn(['document', 'ns2:blobs_common', 'mimeType']);

          return ((mimeType && mimeType.startsWith('image/')) ? 'derivativeOriginalJpeg' : 'original');
        },
        preview: {
          subresource: 'derivativeThumbnail',
        },
        snapshot: {
          subresource: 'derivativeMedium',
        },
      },
    },
  },
});
```

## Property Reference

The content descriptor has the following properties:

### subresource
```
subresource: string | (recordData: Immutable.Map) => string,
```
The subresource to display. This may be a string, which must be one of the above subresource names, or a custom subresource name if additional subresources have been configured. Alternatively, a function may be provided to dynamically compute the subresource. The function will receive the record data as an argument, and should return the name of the subresource to use.
