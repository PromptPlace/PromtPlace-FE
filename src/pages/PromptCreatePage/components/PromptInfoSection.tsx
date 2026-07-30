import FilterModal from './FilterModal';
import CategorySelector from './CategorySelector';
import ModelSelector from './ModelSelector';
import type { FilterModalType } from '@/types/PromptCreatePage/filterModal';
import PriceSelector from './PriceSelector';

interface Props {
  title: string;
  setTitle: (v: string) => void;

  categories: string[];
  setCategories: (v: string[]) => void;

  selectedModels: string[];
  setSelectedModels: (v: string[]) => void;

  modelver: string;
  setModelver: (v: string) => void;

  isPaid: boolean;
  setIsPaid: (v: boolean) => void;

  price: number | null;
  setPrice: (v: number | null) => void;

  uploadModal: boolean;
  setuploadModal: (v: boolean) => void;

  modalInitialTab: FilterModalType;
  setModalInitialTab: (v: FilterModalType) => void;
}

export default function PromptInfoSection(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <p className="text-[16px] font-medium pb-[12px]">프롬프트 제목</p>

        <div className="w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
          <input
            value={props.title}
            onChange={(e) => props.setTitle(e.target.value)}
            maxLength={50}
            placeholder="예) SNS 광고 카피 문구 생성기"
            className="w-full text-[14px] font-light placeholder:text-gray400 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-medium">기본 정보 입력</p>
          <p className="text-[12px] font-light text-gray700">※ 모델 버전이 있는 경우 작성해주세요.</p>
          <p className="text-[12px] font-light text-gray700">※ 모델과 카테고리는 최대 5개까지 선택 가능합니다.</p>
          <p className="text-[12px] font-light text-gray700">※ 가격은 100원부터 10,000원까지 입력 가능합니다.</p>
        </div>

        <CategorySelector
          categories={props.categories}
          onRemove={(c) => props.setCategories(props.categories.filter((v) => v !== c))}
          onOpen={() => {
            props.setModalInitialTab('category');
            props.setuploadModal(true);
          }}
        />

        <ModelSelector
          models={props.selectedModels}
          modelVersion={props.modelver}
          onRemove={(m) => props.setSelectedModels(props.selectedModels.filter((v) => v !== m))}
          onOpen={() => {
            props.setModalInitialTab('model');
            props.setuploadModal(true);
          }}
          onVersionChange={props.setModelver}
        />

        <PriceSelector
          isPaid={props.isPaid}
          setIsPaid={props.setIsPaid}
          price={props.price}
          setPrice={props.setPrice}
          onOpen={() => {
            props.setModalInitialTab('price');
            props.setuploadModal(true);
          }}
        />
      </div>

      <FilterModal
        isOpen={props.uploadModal}
        onClose={() => props.setuploadModal(false)}
        selectedModels={props.selectedModels}
        setSelectedModels={props.setSelectedModels}
        categories={props.categories}
        setCategories={props.setCategories}
        initialTab={props.modalInitialTab}
        isPaid={props.isPaid}
        setIsPaid={props.setIsPaid}
        price={props.price}
        setPrice={props.setPrice}
      />
    </div>
  );
}
