namespace Core.Common.Extensions
{
    public interface IEntity
    {
        long Id { get; set; }

        bool IsDeleted { get; set; }

        DateTime? CreatedAt { get; set; }

        DateTime? UpdatedAt { get; set; }

        long? CreatedBy { get; set; }
       
        long? UpdatedBy { get; set; }
    }
}
