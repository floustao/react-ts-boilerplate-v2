export const FollowUp: React.FC = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <h3>Follow up</h3>
      <ul>
        <li>
          Let users decide of the number of rows & cols (Keep it within
          reasonnable size or switch state mangement from Array to Map for
          better lookup)
        </li>
        <li>Truncate values</li>
        <li>
          Replace instructions with error message on top to indicate users of
          the next steps
        </li>
        <li>Add string sums? ex: 'CAP' + 'LIGHT' should return 'CAPLIGHT'</li>
        <li>Make it more responsive for tablet & phone version</li>
        <li>Add unit tests for all operations to get edge cases</li>
      </ul>
    </div>
  );
};
