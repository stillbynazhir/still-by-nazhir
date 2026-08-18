import FadeIn from "./FadeIn";

export default function SectionHeading({ index, eyebrow, title, watermark }) {
  return (
    <div className="section-heading">
      {watermark && <div className="section-watermark" aria-hidden="true">{watermark}</div>}
      <FadeIn>
        <div className="section-heading-row">
          {index && <span className="section-index">{index}</span>}
          <p className="section-eyebrow">{eyebrow}</p>
        </div>
        <h2 className="section-title">{title}</h2>
      </FadeIn>
    </div>
  );
}
